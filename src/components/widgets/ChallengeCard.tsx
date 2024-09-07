import { Challenge, ChallengeStatus } from "@/models/challenge";
import {
    CSSProperties,
    ComponentProps,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import styles from "@/styles/components/widgets/ChallengeCard.module.scss";
import StarBoldDuotone from "~icons/solar/star-bold";
import Tooltip from "@/components/atoms/Tooltip";
import Badge from "@/components/atoms/Badge";
import { useCategoryStore } from "@/stores/category";
import useThemeColor from "@/hooks/useThemeColor";
import chroma from "chroma-js";
import useHover from "@/hooks/useHover";

export interface ChallengeCard extends ComponentProps<"div"> {
    challenge: Challenge;
    status: ChallengeStatus;
}

export default function ChallengeCard(props: ChallengeCard) {
    const { challenge, status } = props;

    const categoryStore = useCategoryStore();

    const category = categoryStore.getCategory(challenge.category_id);

    const nodeRef = useRef<HTMLDivElement>(null);
    const isHovered = useHover(nodeRef);

    const baseColor = useThemeColor(category?.color || "primary");

    const variables = {
        "--bg-color": useMemo(() => {
            if (isHovered) {
                return chroma(baseColor).alpha(0.375).hex();
            }
            return chroma(baseColor).alpha(0.25).hex();
        }, [isHovered]),
        "--border-color": useMemo(() => {
            if (isHovered) {
                return chroma(baseColor).brighten(0.5).hex();
            }
            return chroma(baseColor).hex();
        }, [isHovered]),
    } as CSSProperties;

    return (
        <div className={styles["root"]} ref={nodeRef} style={variables}>
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
            <h1 className={styles["title"]}>{challenge.title}</h1>
            <div className={styles["divider"]} />
        </div>
    );
}
