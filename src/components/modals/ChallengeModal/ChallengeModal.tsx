import useThemeColor from "@/hooks/useThemeColor";
import { Challenge, ChallengeStatus } from "@/models/challenge";
import { useCategoryStore } from "@/stores/category";
import styles from "./ChallengeModal.module.scss";
import chroma from "chroma-js";
import React, { CSSProperties, useEffect, useState } from "react";
import { TextInput } from "../../core/TextInput/TextInput";
import { Button } from "../../core/Button/Button";
import Plain2Bold from "~icons/solar/plain-2-bold";
import Book2Bold from "~icons/solar/book-2-bold";
import SledgehammerBold from "~icons/solar/sledgehammer-bold";
import Server2Bold from "~icons/solar/server-2-bold";
import FlagBold from "~icons/solar/flag-bold";
import { Icon } from "@/components/core/Icon";
import { Tooltip } from "@/components/core";
import { Box } from "@/components/core/Box";
import { getByID, post } from "@/api/submission";
import Loading from "~icons/svg-spinners/180-ring-with-bg";
import { useToastStore } from "@/stores/toast";
import { nanoid } from "nanoid";

export interface ChallengeModalProps {
    challenge?: Challenge;
    status?: ChallengeStatus;
}

export function ChallengeModal(props: ChallengeModalProps) {
    const { challenge, status, ...rest } = props;

    const toastStore = useToastStore();
    const categoryStore = useCategoryStore();
    const category = categoryStore.getCategory(challenge?.category);
    const baseColor = useThemeColor(category?.color || "primary");

    const [placeholder, setPlaceholder] = useState<string>("flag");
    const [flag, setFlag] = useState<string>("");

    const [submitLoading, setSubmitLoading] = useState<boolean>(false);
    const [submissionID, setSubmissionID] = useState<number>();
    const [toastID, setToastID] = useState<string>(nanoid());

    const [activeTab, setActiveTab] = useState<
        "description" | "pod" | "attachment" | "feedback"
    >("description");

    const tabs: Array<Record<string, any>> = [
        {
            id: "description",
            name: "描述",
            icon: <Book2Bold />,
        },
        {
            id: "pod",
            name: "靶机",
            icon: <Server2Bold />,
        },
        {
            id: "feedback",
            name: "反馈",
            icon: <SledgehammerBold />,
        },
    ];

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

    function handleSubmit() {
        setSubmitLoading(true);
        toastStore.add({
            id: toastID,
            type: "info",
            icon: <Loading />,
            title: "判题中",
            description: "请稍候",
            duration: 99999999,
        });
        post({
            challenge_id: challenge?.id,
            flag: flag,
        }).then((res) => {
            const submission = res.data;
            getByID(submission?.id!).then((res) => {
                const submission = res.data;
                setSubmissionID(submission?.id);
            });
        });
    }

    function fetchSubmission(id: number, intervalID: number) {
        getByID(id).then((res) => {
            const submission = res.data;
            if (submission?.status !== 0) {
                switch (submission?.status) {
                    case 1:
                        toastStore.update(toastID, {
                            icon: undefined,
                            type: "success",
                            title: "正确",
                            description: "恭喜你，提交成功！",
                            duration: 3000,
                        });
                        break;
                    case 2:
                        toastStore.update(toastID, {
                            icon: undefined,
                            type: "error",
                            title: "错误",
                            description: "再检查一下？",
                            duration: 3000,
                        });
                        break;
                    case 3:
                        toastStore.update(toastID, {
                            icon: undefined,
                            type: "warning",
                            title: "作弊",
                            description: "你存在作弊的可能，已记录。",
                            duration: 3000,
                        });
                        break;
                    case 4:
                        toastStore.update(toastID, {
                            icon: undefined,
                            type: "info",
                            title: "无效",
                            description: "提交无效。",
                            duration: 3000,
                        });
                        break;
                }
                clearInterval(intervalID);
                setToastID(nanoid());
                setSubmitLoading(false);
            }
        });
    }

    useEffect(() => {
        let intervalID: number;
        if (submissionID) {
            intervalID = setInterval(() => {
                fetchSubmission(submissionID, intervalID);
            }, 1000);
        }
        return () => clearInterval(intervalID);
    }, [submissionID]);

    const variables = {
        "--challenge-modal-bg-color": chroma(baseColor).darken(0.75).hex(),
        "--challenge-modal-border-color": chroma(baseColor).hex(),
        "--challenge-modal-text-color": chroma(baseColor).darken(1).hex(),
        "--challenge-modal-icon-color": baseColor,
    } as CSSProperties;

    return (
        <Box className={styles["root"]} style={variables}>
            <Box className={styles["container"]}>
                <Box className={styles["navbar"]}>
                    <Box className={styles["info"]}>
                        <Icon
                            icon={category?.icon}
                            className={styles["icon"]}
                        />
                        <Box className={styles["title"]}>
                            {challenge?.title}
                        </Box>
                    </Box>
                    <Box className={styles["tabs"]}>
                        {tabs?.map((tab, index) => (
                            <React.Fragment key={tab.id}>
                                <Tooltip content={tab.name}>
                                    <button
                                        className={styles["tab"]}
                                        onClick={() => setActiveTab(tab.id)}
                                        data-active={activeTab === tab.id}
                                    >
                                        <Icon icon={tab.icon} />
                                    </button>
                                </Tooltip>
                                {index !== tabs.length - 1 && (
                                    <span
                                        style={{
                                            userSelect: "none",
                                        }}
                                    >
                                        /
                                    </span>
                                )}
                            </React.Fragment>
                        ))}
                    </Box>
                </Box>
                <Box className={styles["main"]}>
                    <Box className={styles["content"]}>
                        {activeTab === "description" && (
                            <Box className={styles["description"]}>
                                {challenge?.description}
                            </Box>
                        )}
                        {activeTab === "pod" && (
                            <Box className={styles["pod"]}>
                                <Box className={styles["tip"]}>
                                    本题为动态容器题目，解题需开启容器实例。
                                </Box>
                                <Box className={styles["info"]}></Box>
                                <Box className={styles["controllers"]}>
                                    <Button color={"success"}>启动</Button>
                                    <Button color={"error"} disabled>
                                        销毁
                                    </Button>
                                    <Button color={"info"} disabled>
                                        续期
                                    </Button>
                                </Box>
                            </Box>
                        )}
                        {activeTab === "feedback" && (
                            <Box className={styles["feedback"]}></Box>
                        )}
                    </Box>
                </Box>
                <form
                    className={styles["submit"]}
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                >
                    <TextInput
                        icon={<FlagBold />}
                        clearable
                        color={category?.color}
                        placeholder={placeholder}
                        value={flag}
                        variant={"solid"}
                        onChange={(value) => setFlag(value)}
                        style={{
                            flex: 1,
                        }}
                    />
                    <Button
                        color={category?.color}
                        variant={"solid"}
                        type={"submit"}
                        icon={<Plain2Bold />}
                        loading={submitLoading}
                    >
                        提交
                    </Button>
                </form>
            </Box>
        </Box>
    );
}
