import { useContext, useEffect, useMemo, useState } from "react";
import { Context } from "./context";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Flag, Send } from "lucide-react";
import { cn } from "@/utils";
import { useInterval } from "@/hooks/use-interval";
import { getSubmission, postSubmission } from "@/api/submission";
import { toast } from "sonner";
import { useSharedStore } from "@/storages/shared";

function SubmitSection() {
    const { challenge, gameTeam } = useContext(Context);
    const [placeholder, setPlaceholder] = useState<string>("flag");
    const sharedStore = useSharedStore();

    const mode = useMemo(() => {
        if (!!gameTeam) {
            return "game";
        }

        return "default";
    }, [gameTeam]);

    useInterval(
        () => {
            if (placeholder === "flag_") {
                setPlaceholder("flag");
            } else {
                setPlaceholder("flag_");
            }
        },
        1000,
        [placeholder]
    );

    const [flag, setFlag] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);

    const [submissionId, setSubmissionId] = useState<number>();

    function handleFlagSubmit() {
        setLoading(true);
        postSubmission({
            challenge_id: challenge?.id,
            content: flag?.trim(),
            game_id: mode === "game" ? Number(gameTeam?.game_id) : undefined,
            team_id: mode === "game" ? Number(gameTeam?.team_id) : undefined,
        }).then((res) => {
            if (res.code === 200) {
                setSubmissionId(res?.data?.id);
                setFlag("");
                toast.loading("已提交", {
                    id: `submission-${res?.data?.id}`,
                    description: "请等待审核，这不会太久",
                });
            }

            if (res.code === 500) {
                toast.error("发生了错误", {
                    description: res.msg,
                });
                setLoading(false);
            }
        });
    }

    useEffect(() => {
        let intervalId: number;
        function fetchSubmission() {
            getSubmission({
                id: submissionId,
                is_desensitized: true,
            }).then((res) => {
                const submission = res.data?.[0];
                if (submission?.status !== 0) {
                    switch (submission?.status) {
                        case 1:
                            toast.success("正确", {
                                id: `submission-${submissionId}`,
                                description: "恭喜你，提交成功！",
                            });
                            sharedStore?.setRefresh();
                            break;
                        case 2:
                            toast?.error("错误", {
                                id: `submission-${submissionId}`,
                                description: "再检查一下？",
                            });
                            break;
                        case 3:
                            toast.error("作弊", {
                                id: `submission-${submissionId}`,
                                description: "你存在作弊的可能，已记录。",
                            });
                            break;
                        case 4:
                            toast.info("无效", {
                                id: `submission-${res?.data?.[0]?.id}`,
                                description: "提交无效。",
                            });
                            sharedStore?.setRefresh();
                            break;
                    }
                    clearInterval(intervalId);
                    setLoading(false);
                }
            });
        }
        if (submissionId) {
            intervalId = setInterval(() => {
                fetchSubmission();
            }, 1000) as unknown as number;
        }
        return () => clearInterval(intervalId);
    }, [submissionId]);

    return (
        <div className={cn(["flex", "gap-3", "items-center"])}>
            <Input
                size={"sm"}
                icon={Flag}
                className={cn(["flex-1"])}
                placeholder={placeholder}
                value={flag}
                onChange={(e) => setFlag(e.target.value)}
            />
            <Button
                variant={"tonal"}
                icon={Send}
                onClick={handleFlagSubmit}
                loading={loading}
                disabled={!flag?.trim()}
            >
                提交
            </Button>
        </div>
    );
}

export { SubmitSection };
