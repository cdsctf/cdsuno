import { useContext, useEffect, useMemo, useState } from "react";
import { Context } from "./context";
import { cn } from "@/utils";
import { Env } from "@/models/env";
import { createEnv, getEnvs } from "@/api/envs";
import { renewEnv, stopEnv } from "@/api/envs/env_id";
import { useAuthStore } from "@/storages/auth";
import { toast } from "sonner";
import { useInterval } from "@/hooks/use-interval";
import { Field, FieldButton, FieldIcon } from "@/components/ui/field";
import { TextField } from "@/components/ui/text-field";
import { Button } from "@/components/ui/button";
import { Clipboard, Clock, EthernetPort, Play, Trash } from "lucide-react";
import { copyToClipboard } from "@/utils/clipboard";

function EnvSection() {
    const { challenge, team } = useContext(Context);
    const authStore = useAuthStore();

    const mode = useMemo(() => {
        if (team) {
            return "game";
        }

        return "default";
    }, [team]);

    const [pod, setPod] = useState<Env>();
    const [podStopLoading, setPodStopLoading] = useState<boolean>(false);
    const [podCreateLoading, setPodCreateLoading] = useState<boolean>(false);

    function fetchPods() {
        getEnvs({
            challenge_id: challenge?.id,
            user_id: mode !== "game" ? authStore?.user?.id : undefined,
            game_id: mode === "game" ? Number(team?.game_id) : undefined,
            team_id: mode === "game" ? Number(team?.id) : undefined,
        }).then((res) => {
            if (res.code === 200) {
                const p = res.data?.[0];
                setPod(p);

                if (p?.status !== "waiting") {
                    setPodCreateLoading(false);
                }

                if (p?.status === "running") {
                    toast.dismiss("pod");
                }

                if (
                    p?.status === "waiting" &&
                    p?.reason !== "ContainerCreating"
                ) {
                    toast.warning("容器创建时发生错误，即将触发销毁", {
                        id: "pod",
                        description: p?.reason,
                    });
                    setPodStopLoading(true);
                }
            }
        });
    }

    function handlePodRenew() {
        renewEnv({
            id: pod?.id!,
        }).then((res) => {
            if (res.code === 200) {
                toast.success("续期成功");
            }

            if (res.code === 400) {
                toast.error("续期失败", {
                    description: res.msg,
                });
            }
        });
    }

    function handlePodStop() {
        stopEnv({
            id: pod?.id!,
        })
            .then((_) => {
                toast.info("已下发容器停止命令", {
                    id: "pod-stop",
                });
                setPod(undefined);
            })
            .finally(() => {
                setPodStopLoading(false);
            });
    }

    useEffect(() => {
        if (podStopLoading) {
            handlePodStop();
        }
    }, [podStopLoading]);

    function handlePodCreate() {
        setPodCreateLoading(true);
        toast.loading("正在发送容器创建请求", {
            id: "pod",
        });
        createEnv({
            challenge_id: challenge?.id,
            game_id: mode === "game" ? Number(team?.game_id) : undefined,
            team_id: mode === "game" ? Number(team?.id) : undefined,
        }).then((res) => {
            switch (res.code) {
                case 200: {
                    setPod(res.data);
                    toast.loading("已下发容器启动命令", {
                        id: "pod",
                        description: "这可能需要一些时间",
                    });
                    fetchPods();
                    break;
                }
                default: {
                    toast.error("发生错误", {
                        id: "pod",
                        description: res.msg,
                    });
                }
            }
        });
    }

    useInterval(fetchPods, 2000, [], { immediate: true });

    return (
        <div
            className={cn(["flex", "gap-5", "justify-between", "items-center"])}
        >
            {pod?.id ? (
                <>
                    <div
                        className={cn(["flex-1", "flex", "flex-col", "gap-3"])}
                    >
                        {pod?.nats ? (
                            <>
                                {pod?.nats
                                    ?.split(",")
                                    .map((pair) => pair.split("="))
                                    .map(([src, dst]: Array<string>) => (
                                        <div className={cn(["flex"])} key={src}>
                                            <Field
                                                size={"sm"}
                                                className={cn(["flex-1"])}
                                            >
                                                <FieldIcon
                                                    icon={EthernetPort}
                                                />
                                                <TextField
                                                    readOnly
                                                    value={`${src} - ${pod?.public_entry}:${dst}`}
                                                />
                                                <FieldButton
                                                    icon={Clipboard}
                                                    onClick={() => {
                                                        copyToClipboard(
                                                            `${pod?.public_entry}:${dst}`
                                                        );
                                                        toast.success(
                                                            "已复制到剪贴板"
                                                        );
                                                    }}
                                                />
                                            </Field>
                                        </div>
                                    ))}
                            </>
                        ) : (
                            <>
                                {pod?.ports?.map((port) => (
                                    <div className={cn(["flex"])} key={port}>
                                        <Field
                                            size={"sm"}
                                            className={cn(["flex-1"])}
                                        >
                                            <FieldIcon icon={EthernetPort} />
                                            <TextField
                                                readOnly
                                                value={`${port} - ${window.location.protocol.replace("http", "ws")}//${window.location.host}/api/envs/${pod?.id}/wsrx?port=${port}`}
                                            />
                                            <FieldButton
                                                icon={Clipboard}
                                                onClick={() => {
                                                    copyToClipboard(
                                                        `${window.location.protocol.replace("http", "ws")}//${window.location.host}/api/envs/${pod?.id}/wsrx?port=${port}`
                                                    );
                                                    toast.success(
                                                        "已复制到剪贴板"
                                                    );
                                                }}
                                            />
                                        </Field>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                    <div className={cn(["flex", "gap-3"])}>
                        <Button
                            icon={Clock}
                            level={"info"}
                            variant={"solid"}
                            onClick={() => handlePodRenew()}
                        >
                            续期
                        </Button>
                        <Button
                            icon={Trash}
                            variant={"solid"}
                            level={"error"}
                            onClick={() => handlePodStop()}
                            loading={podStopLoading}
                        >
                            停止
                        </Button>
                    </div>
                </>
            ) : (
                <>
                    <div
                        className={cn([
                            "flex",
                            "flex-col",
                            "text-secondary",
                            "text-sm",
                            "select-none",
                        ])}
                    >
                        <span>本题需要使用动态容器，</span>
                        <span>点击“启动”进行容器下发。</span>
                    </div>
                    <Button
                        icon={Play}
                        variant={"solid"}
                        level={"success"}
                        onClick={() => handlePodCreate()}
                        loading={podCreateLoading}
                    >
                        启动
                    </Button>
                </>
            )}
        </div>
    );
}

export { EnvSection };
