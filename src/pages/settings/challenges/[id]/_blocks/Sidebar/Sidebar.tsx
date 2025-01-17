import { Button, Stack } from "@/components/core";
import styles from "./Sidebar.module.scss";
import ArrowLeftLinear from "~icons/solar/arrow-left-linear";
import InfoCircleBold from "~icons/solar/info-circle-bold";
import FlagBold from "~icons/solar/flag-bold";
import PaperClipLinear from "~icons/solar/paperclip-linear";
import BoxMinimalisticBold from "~icons/solar/box-minimalistic-bold";
import CalendarSearchBold from "~icons/solar/calendar-search-bold";
import { useLocation, useNavigate } from "react-router";
import { useContext } from "react";
import Context from "../../Context";

export function Sidebar() {
    const navigate = useNavigate();
    const { challenge } = useContext(Context);
    const location = useLocation();

    return (
        <Stack className={styles["root"]} justify={"space-between"}>
            <Button
                width={"100%"}
                variant={"ghost"}
                icon={<ArrowLeftLinear />}
                onClick={() => navigate("/settings/challenges")}
            >
                返回上级
            </Button>
            <Stack width={"100%"}>
                <Button
                    width={"100%"}
                    shadow={"none"}
                    icon={<InfoCircleBold />}
                    radius={9999}
                    variant={
                        location.pathname.endsWith(`/${challenge?.id}`)
                            ? "solid"
                            : "ghost"
                    }
                    onClick={() =>
                        navigate(`/settings/challenges/${challenge?.id}`)
                    }
                >
                    基本
                </Button>
                <Button
                    width={"100%"}
                    shadow={"none"}
                    icon={<FlagBold />}
                    radius={9999}
                    variant={
                        location.pathname.endsWith(`/${challenge?.id}/flags`)
                            ? "solid"
                            : "ghost"
                    }
                    onClick={() =>
                        navigate(`/settings/challenges/${challenge?.id}/flags`)
                    }
                >
                    Flag
                </Button>
                {challenge?.has_attachment && (
                    <Button
                        width={"100%"}
                        shadow={"none"}
                        icon={<PaperClipLinear />}
                        radius={9999}
                        variant={
                            location.pathname.endsWith(
                                `/${challenge?.id}/attachments`
                            )
                                ? "solid"
                                : "ghost"
                        }
                        onClick={() =>
                            navigate(
                                `/settings/challenges/${challenge?.id}/attachments`
                            )
                        }
                    >
                        附件
                    </Button>
                )}
                {challenge?.is_dynamic && (
                    <Button
                        width={"100%"}
                        shadow={"none"}
                        icon={<BoxMinimalisticBold />}
                        radius={9999}
                        variant={
                            location.pathname.endsWith(`/${challenge?.id}/pods`)
                                ? "solid"
                                : "ghost"
                        }
                        onClick={() =>
                            navigate(
                                `/settings/challenges/${challenge?.id}/pods`
                            )
                        }
                    >
                        容器
                    </Button>
                )}
                <Button
                    width={"100%"}
                    shadow={"none"}
                    icon={<CalendarSearchBold />}
                    radius={9999}
                    variant={
                        location.pathname.endsWith(
                            `/${challenge?.id}/statistics`
                        )
                            ? "solid"
                            : "ghost"
                    }
                    disabled
                >
                    统计
                </Button>
            </Stack>
            <Button
                width={"100%"}
                variant={"ghost"}
                icon={<ArrowLeftLinear />}
                onClick={() => navigate("/settings/challenges")}
            >
                返回上级
            </Button>
        </Stack>
    );
}
