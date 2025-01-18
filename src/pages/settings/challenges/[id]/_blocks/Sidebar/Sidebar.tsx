import { Box, Button } from "@/components/core";
import styles from "./Sidebar.module.scss";
import ArrowLeftLinear from "~icons/solar/arrow-left-linear";
import InfoCircleBold from "~icons/solar/info-circle-bold";
import FlagBold from "~icons/solar/flag-bold";
import PaperClipLinear from "~icons/solar/paperclip-linear";
import BoxMinimalisticBold from "~icons/solar/box-minimalistic-bold";
import CalendarSearchBold from "~icons/solar/calendar-search-bold";
import { Link, useLocation } from "react-router";
import { useContext } from "react";
import Context from "../../Context";
import { Card } from "@/components/core/Card";
import { Divider } from "@/components/core/Divider";
import clsx from "clsx";

export function Sidebar() {
    const { challenge } = useContext(Context);
    const location = useLocation();

    return (
        <Box
            className={clsx(
                styles["root"],
                "flex flex-col justify-between items-center"
            )}
        >
            <Box className={"flex flex-col w-full items-center gap-[8px]"}>
                <h2 className={styles["title"]}>{challenge?.title}</h2>
                <Divider />
            </Box>
            <Card
                style={{
                    width: "100%",
                }}
            >
                <Box
                    className={
                        "flex flex-col w-full gap-[10px] py-[15px] px-[10px]"
                    }
                >
                    <Link
                        to={`/settings/challenges/${challenge?.id}`}
                        className={styles["link"]}
                    >
                        <Button
                            width={"100%"}
                            shadow={"none"}
                            icon={<InfoCircleBold />}
                            variant={
                                location.pathname.endsWith(`/${challenge?.id}`)
                                    ? "solid"
                                    : "ghost"
                            }
                        >
                            基本
                        </Button>
                    </Link>
                    <Link
                        to={`/settings/challenges/${challenge?.id}/flags`}
                        className={styles["link"]}
                    >
                        <Button
                            width={"100%"}
                            shadow={"none"}
                            icon={<FlagBold />}
                            variant={
                                location.pathname.endsWith(
                                    `/${challenge?.id}/flags`
                                )
                                    ? "solid"
                                    : "ghost"
                            }
                        >
                            Flag
                        </Button>
                    </Link>

                    {challenge?.has_attachment && (
                        <Link
                            to={`/settings/challenges/${challenge?.id}/attachments`}
                            className={styles["link"]}
                        >
                            <Button
                                width={"100%"}
                                shadow={"none"}
                                icon={<PaperClipLinear />}
                                variant={
                                    location.pathname.endsWith(
                                        `/${challenge?.id}/attachments`
                                    )
                                        ? "solid"
                                        : "ghost"
                                }
                            >
                                附件
                            </Button>
                        </Link>
                    )}
                    {challenge?.is_dynamic && (
                        <Link
                            to={`/settings/challenges/${challenge?.id}/pods`}
                            className={styles["link"]}
                        >
                            <Button
                                width={"100%"}
                                shadow={"none"}
                                icon={<BoxMinimalisticBold />}
                                variant={
                                    location.pathname.endsWith(
                                        `/${challenge?.id}/pods`
                                    )
                                        ? "solid"
                                        : "ghost"
                                }
                            >
                                容器
                            </Button>
                        </Link>
                    )}
                    <Button
                        width={"100%"}
                        shadow={"none"}
                        icon={<CalendarSearchBold />}
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
                </Box>
            </Card>
            <Box className={"flex flex-col w-full gap-[8px]"}>
                <Divider />
                <Link to={"/settings/challenges"} className={styles["link"]}>
                    <Button
                        width={"100%"}
                        variant={"ghost"}
                        icon={<ArrowLeftLinear />}
                    >
                        返回上级
                    </Button>
                </Link>
            </Box>
        </Box>
    );
}
