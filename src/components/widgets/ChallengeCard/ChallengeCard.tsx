import { Challenge, ChallengeStatus } from "@/models/challenge";
import { CSSProperties, ComponentProps, useMemo } from "react";
import styles from "./ChallengeCard.module.scss";
import StarBoldDuotone from "~icons/solar/star-bold";
import { Tooltip } from "@/components/core/Tooltip";
import { Badge } from "@/components/core/Badge";
import { useCategoryStore } from "@/stores/category";
import useThemeColor from "@/hooks/useThemeColor";
import chroma from "chroma-js";
import { Icon } from "@/components/core/Icon";
import { Box } from "@/components/core/Box";
import { Flex } from "@/components/core/Flex";
import clsx from "clsx";

export interface ChallengeCard extends ComponentProps<"div"> {
    challenge: Challenge;
    status?: ChallengeStatus;
}

export function ChallengeCard(props: ChallengeCard) {
    const { challenge, status, className, style, ref, ...rest } = props;

    const categoryStore = useCategoryStore();

    const category = categoryStore.getCategory(challenge.category);

    const baseColor = useThemeColor("primary");
    const cc = useThemeColor(category?.color || "primary");

    const bgColor = useMemo(() => {
        if (status?.is_solved) {
            return chroma(cc).alpha(0.25).hex();
        }
        return chroma(baseColor).alpha(0.25).hex();
    }, [baseColor, status?.is_solved]);
    const borderColor = useMemo(() => {
        if (status?.is_solved) {
            return chroma(cc).darken(0.5).alpha(0.25).hex();
        }
        return chroma(baseColor).alpha(0.25).hex();
    }, [baseColor, status?.is_solved]);
    const borderSecondayColor = useMemo(() => {
        // if (status?.is_solved) {
        //     return chroma(baseColor).darken(0.5).hex();
        // }
        return chroma(baseColor).hex();
    }, [baseColor, status?.is_solved]);
    const textColor = useMemo(() => {
        if (status?.is_solved) {
            return chroma(cc).darken(1).hex();
        }
        return chroma(baseColor).darken(1).hex();
    }, [baseColor, status?.is_solved]);
    const iconColor = useMemo(() => {
        if (status?.is_solved) {
            return chroma(cc).darken(1).hex();
        }
        return chroma(baseColor).hex();
    }, [baseColor, status?.is_solved]);

    const variables = {
        "--challenge-card-trapezoid-color": chroma(cc).darken(1).hex(),
        "--challenge-card-bg-color": bgColor,
        "--challenge-card-border-color": borderColor,
        "--challenge-card-border-secondary-color": borderSecondayColor,
        "--challenge-card-text-color": textColor,
        "--challenge-card-icon-color": iconColor,
    } as CSSProperties;

    return (
        <Box
            className={clsx(styles["root"], className)}
            style={{ ...style, ...variables }}
            ref={ref}
            {...rest}
        >
            <Flex className={styles["category"]}>
                <Badge variant={"solid"} color={chroma(cc).darken(1).hex()}>
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
                <Tooltip content={"123"} position={"bottom"}>
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
