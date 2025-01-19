import { Box, Button } from "@/components/core";
import { Challenge } from "@/models/challenge";
import TrashBinTrashBold from "~icons/solar/trash-bin-trash-bold";
import styles from "./ChallengeDeleteModal.module.scss";
import { deleteChallenge } from "@/api/challenge";
import { useToastStore } from "@/stores/toast";
import { useSharedStore } from "@/stores/shared";
import clsx from "clsx";

export interface ChallengeDeleteModalProps {
    challenge?: Challenge;
    onClose: () => void;
}

export function ChallengeDeleteModal(props: ChallengeDeleteModalProps) {
    const { challenge, onClose } = props;
    const toastStore = useToastStore();
    const sharedStore = useSharedStore();

    function handleChallengeDelete() {
        deleteChallenge({
            id: challenge?.id,
        }).then((_) => {
            toastStore.add({
                type: "success",
                title: "成功",
                description: `题目 ${challenge?.title} 删除成功`,
            });
            onClose();
            sharedStore?.setRefresh();
        });
    }

    return (
        <Box className={clsx(styles["root"], "flex flex-col")}>
            <Box
                className={
                    "flex items-center gap-[5px] text-error dark:text-white"
                }
            >
                <Box style={{ fontSize: "1.125rem" }}>
                    <TrashBinTrashBold />
                </Box>
                <h2 style={{ fontSize: "0.95rem" }}>从题库中删除题目</h2>
            </Box>
            <Box className={"flex w-full justify-center"}>
                <p
                    style={{
                        fontSize: "1.25rem",
                        fontWeight: 600,
                        textDecoration: "underline",
                    }}
                >
                    {challenge?.title}
                </p>
            </Box>
            <span>
                将从题库中软删除，但无法恢复。所有与之相关的数据会得到保留。请问你确定要删除这道题目吗？
            </span>
            <Box className={"flex w-full justify-end"}>
                <Button
                    variant={"solid"}
                    color={"error"}
                    className="shadow-none"
                    onClick={handleChallengeDelete}
                >
                    确定
                </Button>
            </Box>
        </Box>
    );
}
