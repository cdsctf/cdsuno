import useThemeColor from "@/hooks/useThemeColor";
import { Challenge, ChallengeStatus } from "@/models/challenge";
import { useCategoryStore } from "@/stores/category";
import styles from "@/styles/components/modals/ChallengeModal.module.scss";
import chroma from "chroma-js";
import { CSSProperties, useEffect, useState } from "react";
import TextInput from "../atoms/TextInput";
import Badge from "../atoms/Badge";
import Button from "../atoms/Button";

export interface ChallengeModalProps {
    challenge: Challenge;
    status: ChallengeStatus;
}

export default function ChallengeModal(props: ChallengeModalProps) {
    const { challenge, status, ...rest } = props;

    const categoryStore = useCategoryStore();

    const category = categoryStore.getCategory(challenge.category);

    const baseColor = useThemeColor(category?.color || "primary");

    const [placeholder, setPlaceholder] = useState<string>("Flag");

    const [flag, setFlag] = useState<string>("");

    useEffect(() => {
        const interval = setInterval(() => {
            setPlaceholder((prev) => {
                if (prev === "flag") {
                    return "flag_";
                } else {
                    return "flag";
                }
            });
        }, 500);

        return () => clearInterval(interval);
    }, []);

    const variables = {
        "--bg-color": chroma(baseColor).alpha(0.25).hex(),
        "--border-color": chroma(baseColor).hex(),
        "--text-color": chroma(baseColor).darken(1).hex(),
        "--icon-color": baseColor,
        "--grid-color": chroma(baseColor).darken(1).alpha(0.1).hex(),
    } as CSSProperties;

    return (
        <div className={styles["root"]} style={variables}>
            <div className={styles["container"]}>
                <div className={styles["navbar"]}>
                    <div className={styles["category"]}>
                        <Badge
                            variant={"light"}
                            color={chroma(baseColor).darken(1).hex()}
                        >
                            {category?.name?.toUpperCase()}
                        </Badge>
                    </div>
                    <div className={styles["title"]}>{challenge.title}</div>
                    <div className={styles["toggle"]}></div>
                    <div className={styles["icon"]}>{category?.icon}</div>
                </div>
                <div className={styles["content"]}>
                    <div className={styles["description"]}>
                        {challenge.description}
                    </div>
                </div>
                <div className={styles["submit"]}>
                    <TextInput
                        className={styles["input"]}
                        color={category?.color}
                        placeholder={placeholder}
                        value={flag}
                        onChange={(e) => setFlag(e.target.value)}
                    />
                    <Button
                        className={styles["button"]}
                        color={category?.color}
                        variant={"solid"}
                        size={"lg"}
                    >
                        提交
                    </Button>
                </div>
                {/* <div className={styles["sidebar"]}>111</div> */}
            </div>
        </div>
    );
}
