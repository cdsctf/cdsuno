import useThemeColor from "@/hooks/useThemeColor";
import { Challenge, ChallengeStatus } from "@/models/challenge";
import { useCategoryStore } from "@/stores/category";
import styles from "./ChallengeModal.module.scss";
import chroma from "chroma-js";
import { CSSProperties, ReactNode, useEffect, useState } from "react";
import { TextInput } from "../../core/TextInput/TextInput";
import { Badge } from "../../core/Badge";
import { Button } from "../../core/Button/Button";
import Plain2Bold from "~icons/solar/plain-2-bold";
import Book2Bold from "~icons/solar/book-2-bold";
import SledgehammerBold from "~icons/solar/sledgehammer-bold";
import Server2Bold from "~icons/solar/server-2-bold";
import FolderWithFilesBold from "~icons/solar/folder-with-files-bold";
import FlagBold from "~icons/solar/flag-bold";
import { Tooltip } from "../../core/Tooltip";

export interface ChallengeModalProps {
    challenge: Challenge;
    status: ChallengeStatus;
}

export function ChallengeModal(props: ChallengeModalProps) {
    const { challenge, status, ...rest } = props;

    const categoryStore = useCategoryStore();
    const category = categoryStore.getCategory(challenge.category);
    const baseColor = useThemeColor(category?.color || "primary");

    const variables = {
        "--bg-color": chroma(baseColor).darken(0.75).hex(),
        "--border-color": chroma(baseColor).hex(),
        "--text-color": chroma(baseColor).darken(1).hex(),
        "--icon-color": baseColor,
    } as CSSProperties;

    const [placeholder, setPlaceholder] = useState<string>("flag");
    const [flag, setFlag] = useState<string>("");

    const [activeTab, setActiveTab] = useState<
        "description" | "pod" | "attachment" | "feedback"
    >("description");

    const tabIcons: Record<
        "description" | "pod" | "attachment" | "feedback",
        ReactNode
    > = {
        description: <Book2Bold />,
        pod: <Server2Bold />,
        attachment: <FolderWithFilesBold />,
        feedback: <SledgehammerBold />,
    };

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
                    <div className={styles["title"]}>{challenge?.title}</div>
                    <div className={styles["toggle"]}></div>
                    <div className={styles["icon"]}>{category?.icon}</div>
                </div>
                <div className={styles["main"]}>
                    <div className={styles["sidebar"]}>
                        <div
                            className={styles["tab"]}
                            onClick={() => setActiveTab("description")}
                        >
                            <Tooltip
                                content={"描述"}
                                position={"left"}
                                offset={20}
                            >
                                {tabIcons["description"]}
                            </Tooltip>
                        </div>
                        <div className={styles["divider"]} />
                        <div
                            className={styles["tab"]}
                            onClick={() => setActiveTab("pod")}
                        >
                            <Tooltip
                                content={"容器"}
                                position={"left"}
                                offset={20}
                            >
                                {tabIcons["pod"]}
                            </Tooltip>
                        </div>
                        <div className={styles["divider"]} />
                        <div
                            className={styles["tab"]}
                            onClick={() => setActiveTab("attachment")}
                        >
                            <Tooltip
                                content={"附件"}
                                position={"left"}
                                offset={20}
                            >
                                {tabIcons["attachment"]}
                            </Tooltip>
                        </div>
                        <div className={styles["divider"]} />
                        <div
                            className={styles["tab"]}
                            onClick={() => setActiveTab("feedback")}
                        >
                            <Tooltip
                                content={"反馈"}
                                position={"left"}
                                offset={20}
                            >
                                {tabIcons["feedback"]}
                            </Tooltip>
                        </div>
                    </div>
                    <div className={styles["content"]}>
                        {activeTab === "description" && (
                            <div className={styles["description"]}>
                                {challenge.description}
                            </div>
                        )}
                        {activeTab === "pod" && (
                            <div className={styles["pod"]}>
                                <div className={styles["tip"]}>
                                    本题为动态容器题目，解题需开启容器实例。
                                </div>
                                <div className={styles["info"]}></div>
                                <div className={styles["controllers"]}>
                                    <Button color={"success"}>启动</Button>
                                    <Button color={"error"} disabled>
                                        销毁
                                    </Button>
                                    <Button color={"info"} disabled>
                                        续期
                                    </Button>
                                </div>
                            </div>
                        )}
                        {activeTab === "attachment" && (
                            <div className={styles["attachment"]}></div>
                        )}
                        {activeTab === "feedback" && (
                            <div className={styles["feedback"]}></div>
                        )}
                    </div>
                </div>
                <form
                    className={styles["submit"]}
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                >
                    <TextInput
                        width={"100%"}
                        icon={<FlagBold />}
                        clearable
                        color={category?.color}
                        placeholder={placeholder}
                        value={flag}
                        variant={"solid"}
                        onChange={(value) => setFlag(value)}
                    />
                    <Button
                        color={category?.color}
                        variant={"solid"}
                        type={"submit"}
                        icon={<Plain2Bold />}
                    >
                        提交
                    </Button>
                </form>
            </div>
        </div>
    );
}
