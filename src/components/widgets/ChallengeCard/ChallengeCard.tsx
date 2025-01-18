import { Challenge, ChallengeStatus } from "@/models/challenge";
import { CSSProperties, ComponentProps } from "react";
import styles from "./ChallengeCard.module.scss";
import StarBoldDuotone from "~icons/solar/star-bold";
import { Tooltip } from "@/components/core/Tooltip";
import { Badge } from "@/components/core/Badge";
import { useCategoryStore } from "@/stores/category";
import useThemeColor from "@/hooks/useThemeColor";
import chroma from "chroma-js";
import { Box } from "@/components/core/Box";
import clsx from "clsx";
import CupFirstBold from "~icons/solar/cup-first-bold";
import FlagBold from "~icons/solar/flag-bold";

export interface ChallengeCard extends ComponentProps<"div"> {
    challenge: Challenge;
    status?: ChallengeStatus;
}

export function ChallengeCard(props: ChallengeCard) {
    const { challenge, status, className, style, ref, ...rest } = props;

    const categoryStore = useCategoryStore();

    const category = categoryStore.getCategory(challenge.category);

    const baseColor = useThemeColor(category?.color || "primary");

    const variables = {
        "--challenge-card-bg-color": "var(--color-primary)",
        "--challenge-card-border-color": "var(--color-primary)",
        "--challenge-card-text-color": "var(--color-primary)",
        "--challenge-card-icon-color": "var(--color-primary)",
        "--challenge-card-solved-bg-color": chroma(baseColor).alpha(0.25).hex(),
        "--challenge-card-solved-border-color": chroma(baseColor)
            .darken(0.5)
            .alpha(0.25)
            .hex(),
        "--challenge-card-solved-text-color": chroma(baseColor).darken(1).hex(),
        "--challenge-card-solved-icon-color": chroma(baseColor).darken(1).hex(),
        "--challenge-card-solved-trapezoid-color": chroma(baseColor)
            .darken(1)
            .hex(),
    } as CSSProperties;

    return (
        <Box
            className={clsx(styles["root"], className)}
            style={{ ...style, ...variables }}
            data-solved={status?.is_solved}
            ref={ref}
            {...rest}
        >
            <Box
                className={
                    "flex absolute top-[12.5%] left-[20px] text-[0.75rem] font-semibold select-none"
                }
            >
                <Badge
                    variant={"solid"}
                    color={chroma(baseColor).darken(1).hex()}
                >
                    {category?.name?.toUpperCase()}
                </Badge>
            </Box>
            <Box className={styles["icon"]}>{category?.icon}</Box>
            <h1 className={styles["title"]}>{challenge.title}</h1>
            <Box className={styles["divider"]} />
            <Box className={styles["id"]}>
                # {challenge?.id?.toString(16).toUpperCase().padStart(6, "0")}
            </Box>
            <Box className={styles["status"]}>
                <Tooltip
                    hasArrow
                    content={
                        <>
                            {Number(status?.solved_times) > 0 && (
                                <Box className={"flex flex-col gap-[5px]"}>
                                    {Number(status?.bloods?.length) > 0 && (
                                        <Box
                                            className={
                                                "flex items-center gap-[10px]"
                                            }
                                        >
                                            <CupFirstBold color={"#FFC107"} />
                                            <Box className={"flex flex-col"}>
                                                <span
                                                    style={{
                                                        fontSize: "0.8rem",
                                                    }}
                                                >
                                                    {
                                                        status?.bloods?.[0]
                                                            ?.user?.nickname
                                                    }
                                                </span>
                                                <span
                                                    style={{
                                                        fontSize: "0.75rem",
                                                    }}
                                                >
                                                    {new Date(
                                                        Number(
                                                            status?.bloods?.[0]
                                                                ?.created_at
                                                        ) * 1000
                                                    ).toLocaleString()}
                                                </span>
                                            </Box>
                                        </Box>
                                    )}
                                    {Number(status?.bloods?.length) > 1 && (
                                        <Box
                                            className={
                                                "flex items-center gap-[10px]"
                                            }
                                        >
                                            <FlagBold color={"#9E9E9E"} />
                                            <Box className={"flex flex-col"}>
                                                <span
                                                    style={{
                                                        fontSize: "0.8rem",
                                                    }}
                                                >
                                                    {
                                                        status?.bloods?.[1]
                                                            ?.user?.nickname
                                                    }
                                                </span>
                                                <span
                                                    style={{
                                                        fontSize: "0.75rem",
                                                    }}
                                                >
                                                    {new Date(
                                                        Number(
                                                            status?.bloods?.[1]
                                                                ?.created_at
                                                        ) * 1000
                                                    ).toLocaleString()}
                                                </span>
                                            </Box>
                                        </Box>
                                    )}
                                    {Number(status?.bloods?.length) > 2 && (
                                        <Box
                                            className={
                                                "flex items-center gap-[10px]"
                                            }
                                        >
                                            <FlagBold color={"#FF9800"} />
                                            <Box className={"flex flex-col"}>
                                                <span
                                                    style={{
                                                        fontSize: "0.8rem",
                                                    }}
                                                >
                                                    {
                                                        status?.bloods?.[2]
                                                            ?.user?.nickname
                                                    }
                                                </span>
                                                <span
                                                    style={{
                                                        fontSize: "0.75rem",
                                                    }}
                                                >
                                                    {new Date(
                                                        Number(
                                                            status?.bloods?.[2]
                                                                ?.created_at
                                                        ) * 1000
                                                    ).toLocaleString()}
                                                </span>
                                            </Box>
                                        </Box>
                                    )}
                                </Box>
                            )}
                            {Number(status?.solved_times) == 0 && (
                                <span>虚位以待</span>
                            )}
                        </>
                    }
                    placement={"bottom"}
                >
                    <Box>{status?.solved_times} 次解决</Box>
                </Tooltip>
            </Box>
            {status?.is_solved && (
                <>
                    <Box className={styles["trapezoid"]} />
                    <Box className={styles["star"]}>
                        <Tooltip content={"已解决"}>
                            <StarBoldDuotone color={"white"} />
                        </Tooltip>
                    </Box>
                </>
            )}
        </Box>
    );
}
