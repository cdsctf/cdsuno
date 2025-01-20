import { Challenge, ChallengeStatus } from "@/models/challenge";
import { useCategoryStore } from "@/stores/category";
import React, { useEffect, useState } from "react";
import { Button, TextInput, Tooltip, Box } from "@/components/core";
import { getByID, post } from "@/api/submission";
import { useToastStore } from "@/stores/toast";
import { useSharedStore } from "@/stores/shared";
import { nanoid } from "nanoid";
import Plain2Bold from "~icons/solar/plain-2-bold";
import Book2Bold from "~icons/solar/book-2-bold";
import SledgehammerBold from "~icons/solar/sledgehammer-bold";
import Server2Bold from "~icons/solar/server-2-bold";
import FlagBold from "~icons/solar/flag-bold";
import Loading from "~icons/svg-spinners/180-ring-with-bg";
import clsx from "clsx";

export interface ChallengeModalProps {
    challenge?: Challenge;
    status?: ChallengeStatus;
}

export function ChallengeModal(props: ChallengeModalProps) {
    const { challenge, status } = props;

    const sharedStore = useSharedStore();
    const toastStore = useToastStore();
    const categoryStore = useCategoryStore();
    const category = categoryStore.getCategory(challenge?.category);

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
                setFlag("");
                clearInterval(intervalID);
                setToastID(nanoid());
                setSubmitLoading(false);
                sharedStore.setRefresh();
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

    return (
        <Box
            className={clsx(
                "flex flex-col items-center",
                "rounded-[22.5px] w-[80vw] xl:w-[42.5rem]"
            )}
        >
            <Box
                className={clsx(
                    "flex flex-col items-center w-full p-[16px] rounded-[22.5px]"
                )}
            >
                <Box
                    className={clsx(
                        "w-full flex justify-between items-center gap-[16px]",
                        "bg-primary rounded-t-[12px] py-[10px] px-[20px] text-[white]"
                    )}
                >
                    <Box className={clsx("w-1/2 flex items-center gap-[8px]")}>
                        <Box className={"w-[1.75rem] h-[1.75rem]"}>
                            {category?.icon}
                        </Box>
                        <Box
                            className={clsx(
                                "w-4/5 overflow-hidden flex-shrink-0",
                                "text-ellipsis whitespace-nowrap text-[1rem] font-bold"
                            )}
                        >
                            {challenge?.title}
                        </Box>
                    </Box>
                    <Box className={"flex gap-[8px] h-[36px] items-center"}>
                        {tabs?.map((tab, index) => (
                            <React.Fragment key={tab.id}>
                                <Tooltip content={tab.name}>
                                    <button
                                        className={clsx(
                                            "flex items-center cursor-pointer",
                                            "transition-all duration-200 ease-in-out",
                                            "rounded-full p-[2px] gap-[8px]",
                                            "active:translate-y-[2px] bg-[transparent]"
                                        )}
                                        onClick={() => setActiveTab(tab.id)}
                                        data-active={activeTab === tab.id}
                                    >
                                        {tab.icon}
                                    </button>
                                </Tooltip>
                            </React.Fragment>
                        ))}
                    </Box>
                </Box>
                <Box
                    className={clsx(
                        "flex w-full min-h-[20rem] max-h-[35rem]",
                        "bg-[var(--bg-2nd-color)]",
                        "rounded-b-[12px] border-1 border-dotted border-primary border-t-none"
                    )}
                >
                    <Box
                        className={clsx(
                            "relative w-full overflow-hidden p-[16px]",
                            "transition-all duration-200 ease-in-out",
                            "z-[1] overflow-y-auto break-words"
                        )}
                    >
                        {activeTab === "description" && (
                            <Box className={"break-words"}>
                                {challenge?.description}
                            </Box>
                        )}
                        {activeTab === "pod" && (
                            <Box className={"h-full flex flex-col gap-[10px]"}>
                                <Box
                                    className={
                                        "flex justify-center text-[0.75rem]"
                                    }
                                >
                                    本题为动态容器题目，解题需开启容器实例。
                                </Box>
                                <Box className={"flex-1"}></Box>
                                <Box
                                    className={"flex justify-center gap-[15px]"}
                                >
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
                        {activeTab === "feedback" && <Box></Box>}
                    </Box>
                </Box>
                <form
                    className={clsx(
                        "flex w-[99%] items-center gap-[15px] my-[12px]"
                    )}
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                >
                    <TextInput
                        icon={<FlagBold />}
                        clearable
                        placeholder={placeholder}
                        value={flag}
                        variant={"solid"}
                        onChange={(value) => setFlag(value)}
                        className="flex-1"
                    />
                    <Button
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
