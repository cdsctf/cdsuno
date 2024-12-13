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
import { Flex } from "@/components/core/Flex";
import clsx from "clsx";
import { Stack } from "@/components/core";
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
            <Flex className={styles["category"]}>
                <Badge
                    variant={"solid"}
                    color={chroma(baseColor).darken(1).hex()}
                >
                    {category?.name?.toUpperCase()}
                </Badge>
            </Flex>
            <Box className={styles["icon"]}>{category?.icon}</Box>
            <h1 className={styles["title"]}>{challenge.title}</h1>
            <Box className={styles["divider"]} />
            <Box className={styles["id"]}>
                # {challenge?.id?.toString(16).toUpperCase().padStart(6, "0")}
            </Box>
            <Box className={styles["status"]}>
                <Tooltip
                    content={
                        <>
                            {Number(status?.solved_times) > 0 && (
                                <Stack gap={5}>
                                    {Number(status?.bloods?.length) > 0 && (
                                        <Flex gap={10} align={"center"}>
                                            <CupFirstBold color={"#FFC107"} />
                                            <Stack gap={0}>
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
                                            </Stack>
                                        </Flex>
                                    )}
                                    {Number(status?.bloods?.length) > 1 && (
                                        <Flex gap={10} align={"center"}>
                                            <FlagBold color={"#9E9E9E"} />
                                            <Stack gap={0}>
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
                                            </Stack>
                                        </Flex>
                                    )}
                                    {Number(status?.bloods?.length) > 2 && (
                                        <Flex gap={10} align={"center"}>
                                            <FlagBold color={"#FF9800"} />
                                            <Stack gap={0}>
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
                                            </Stack>
                                        </Flex>
                                    )}
                                </Stack>
                            )}
                            {Number(status?.solved_times) == 0 && (
                                <span>虚位以待</span>
                            )}
                        </>
                    }
                    position={"bottom"}
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
