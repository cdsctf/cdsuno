import { Challenge, ChallengeStatus } from "@/models/challenge";
import { CSSProperties, ComponentProps, useMemo, useRef } from "react";
import styles from "@/styles/components/widgets/ChallengeCard.module.scss";
import StarBoldDuotone from "~icons/solar/star-bold";
import Tooltip from "@/components/atoms/Tooltip";
import Badge from "@/components/atoms/Badge";
import { useCategoryStore } from "@/stores/category";
import useThemeColor from "@/hooks/useThemeColor";
import chroma from "chroma-js";
import { useThemeStore } from "@/stores/theme";

export interface ChallengeCard extends ComponentProps<"div"> {
    challenge: Challenge;
    status: ChallengeStatus;
}

export default function ChallengeCard(props: ChallengeCard) {
    const { challenge, status } = props;

    const categoryStore = useCategoryStore();
    const themeStore = useThemeStore();

    const category = categoryStore.getCategory(challenge.category);

    const baseColor = useThemeColor(category?.color || "primary");
    const bgColor = useMemo(() => {
        const map = [
            chroma(baseColor).alpha(0.25).hex(),
            chroma(baseColor).hex(),
        ];
        return map[Number(status.is_solved)];
    }, [baseColor]);
    const borderColor = useMemo(() => {
        return chroma(baseColor).hex();
    }, [baseColor]);
    const borderSecondayColor = useMemo(() => {
        const map = [
            chroma(baseColor).hex(),
            chroma(baseColor).darken(0.5).hex(),
        ];
        return map[Number(status.is_solved)];
    }, [baseColor]);
    const textColor = useMemo(() => {
        const map = [
            [baseColor, "#FFFFFF"],
            ["#FFFFFF", "#FFFFFF"],
        ];
        return map[Number(themeStore.darkMode)][Number(status.is_solved)];
    }, [baseColor, themeStore.darkMode]);
    const iconColor = useMemo(() => {
        const map = [baseColor, "#FFFFFF"];
        return map[Number(status.is_solved)];
    }, [baseColor]);
    const gridColor = useMemo(() => {
        const map = [
            [
                chroma(textColor).alpha(0.1).hex(),
                chroma("#FFFFFF").alpha(0.05).hex(),
            ],
            [
                chroma(textColor).alpha(0.1).hex(),
                chroma("#FFFFFF").alpha(0.1).hex(),
            ],
        ];
        return map[Number(themeStore.darkMode)][Number(status.is_solved)];
    }, [baseColor, themeStore.darkMode]);

    const variables = {
        "--bg-color": bgColor,
        "--border-color": borderColor,
        "--border-secondary-color": borderSecondayColor,
        "--text-color": textColor,
        "--icon-color": iconColor,
        "--grid-color": gridColor,
    } as CSSProperties;

    return (
        <div className={styles["root"]} style={variables}>
            <div className={styles["wrapper"]}>
                {status?.is_solved && (
                    <div className={styles["star"]}>
                        <Tooltip content={"已解决"}>
                            <StarBoldDuotone color={"#FFD700"} />
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
                <div className={styles["icon"]}>{category?.icon}</div>
                <h1 className={styles["title"]}>{challenge.title}</h1>
                <div className={styles["divider"]} />
                <div className={styles["status"]}>
                    {status?.solved_times} 次解决
                </div>
            </div>
        </div>
    );
}
