import { Challenge, ChallengeStatus } from "@/models/challenge";
import { CSSProperties, ComponentProps, useMemo, useRef } from "react";
import styles from "@/styles/components/widgets/ChallengeCard.module.scss";
import StarBoldDuotone from "~icons/solar/star-bold";
import Tooltip from "@/components/atoms/Tooltip";
import Badge from "@/components/atoms/Badge";
import { useCategoryStore } from "@/stores/category";
import useThemeColor from "@/hooks/useThemeColor";
import chroma from "chroma-js";
import useHover from "@/hooks/useHover";
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

    const nodeRef = useRef<HTMLDivElement>(null);
    const isHovered = useHover(nodeRef);

    const baseColor = useThemeColor(category?.color || "primary");
    const bgColor = useMemo(() => {
        if (isHovered) {
            return chroma(baseColor).alpha(0.3).hex();
        }
        return chroma(baseColor).alpha(0.25).hex();
    }, [baseColor, isHovered]);
    const borderColor = useMemo(() => {
        if (isHovered) {
            return chroma(baseColor).brighten(0.5).hex();
        }
        return chroma(baseColor).hex();
    }, [baseColor, isHovered]);
    const textColor = useMemo(() => {
        if (themeStore.darkMode) {
            return "#FFFFFF";
        }
        return baseColor;
    }, [baseColor, themeStore.darkMode]);
    const gridColor = useMemo(() => {
        if (themeStore.darkMode) {
            return chroma("#FFFFFF").alpha(0.05).hex();
        }
        return chroma(textColor).alpha(0.1).hex();
    }, [baseColor, themeStore.darkMode]);
    const cursorStyle = useMemo(() => {
        return isHovered ? "pointer" : "default";
    }, [isHovered]);
    const variables = {
        "--bg-color": bgColor,
        "--border-color": borderColor,
        "--text-color": textColor,
        "--grid-color": gridColor,
        cursor: cursorStyle,
    } as CSSProperties;

    return (
        <div className={styles["root"]} ref={nodeRef} style={variables}>
            <div className={styles["wrapper"]}>
                <div className={styles["star"]}>
                    <Tooltip content={"已解决"}>
                        <StarBoldDuotone color={"#FFD700"} />
                    </Tooltip>
                </div>
                <div className={styles["category"]}>
                    <Badge variant="light" color={category?.color}>
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
