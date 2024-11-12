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

export interface ChallengeCard extends ComponentProps<"div"> {
    challenge: Challenge;
    status: ChallengeStatus;
}

export function ChallengeCard(props: ChallengeCard) {
    const { challenge, status, ...rest } = props;

    const categoryStore = useCategoryStore();

    const category = categoryStore.getCategory(challenge.category);

    const baseColor = useThemeColor(category?.color || "primary");

    const bgColor = useMemo(() => {
        if (status.is_solved) {
            return chroma(baseColor).hex();
        }
        return chroma(baseColor).alpha(0.375).hex();
    }, [baseColor, status.is_solved]);
    const borderColor = useMemo(() => {
        return chroma(baseColor).hex();
    }, [baseColor, status.is_solved]);
    const borderSecondayColor = useMemo(() => {
        if (status.is_solved) {
            return chroma(baseColor).darken(0.5).hex();
        }
        return chroma(baseColor).hex();
    }, [baseColor, status.is_solved]);
    const textColor = useMemo(() => {
        if (status.is_solved) {
            return "#FFFFFF";
        }
        return chroma(baseColor).darken(1).hex();
    }, [baseColor, status.is_solved]);
    const iconColor = useMemo(() => {
        if (status.is_solved) {
            return "#FFFFFF";
        }
        return chroma(baseColor).hex();
    }, [baseColor, status.is_solved]);
    const gridColor = useMemo(() => {
        if (status?.is_solved) {
            return chroma("#FFFFFF").alpha(0.05).hex();
        }
        return chroma(textColor).alpha(0.1).hex();
    }, [baseColor, status.is_solved]);

    const variables = {
        "--challenge-card-bg-color": bgColor,
        "--challenge-card-border-color": borderColor,
        "--challenge-card-border-secondary-color": borderSecondayColor,
        "--challenge-card-text-color": textColor,
        "--challenge-card-icon-color": iconColor,
        "--challenge-card-grid-color": gridColor,
    } as CSSProperties;

    return (
        <div className={styles["root"]} style={variables} {...rest}>
            <div className={styles["wrapper"]}>
                {status?.is_solved && (
                    <div className={styles["star"]}>
                        <Tooltip content={"已解决"}>
                            <Icon
                                icon={<StarBoldDuotone color={"#FFD700"} />}
                            />
                        </Tooltip>
                    </div>
                )}
                <div className={styles["category"]}>
                    <Badge
                        variant={"light"}
                        color={chroma(baseColor).darken(1).hex()}
                    >
                        {category?.name?.toUpperCase()}
                    </Badge>
                </div>
                <div className={styles["icon"]}>
                    <Icon icon={category?.icon} />
                </div>
                <h1 className={styles["title"]}>{challenge.title}</h1>
                <div className={styles["divider"]} />
                <div className={styles["status"]}>
                    {status?.solved_times} 次解决
                </div>
            </div>
        </div>
    );
}
