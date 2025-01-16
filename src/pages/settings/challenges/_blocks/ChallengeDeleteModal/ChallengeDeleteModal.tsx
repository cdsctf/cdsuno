import { Box, Button, Flex, Stack } from "@/components/core";
import { Challenge } from "@/models/challenge";
import TrashBinTrashBold from "~icons/solar/trash-bin-trash-bold";
import styles from "./ChallengeDeleteModal.module.scss";
import { deleteChallenge } from "@/api/challenge";
import { useToastStore } from "@/stores/toast";
import { useSharedStore } from "@/stores/shared";

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
        <Stack className={styles["root"]}>
            <Flex
                align={"center"}
                gap={5}
                style={{
                    color: "light-dark(var(--color-error), #ffffff)",
                }}
            >
                <Box style={{ fontSize: "1.125rem" }}>
                    <TrashBinTrashBold />
                </Box>
                <h2 style={{ fontSize: "0.95rem" }}>从题库中删除题目</h2>
            </Flex>
            <Flex width={"100%"} justify={"center"}>
                <p
                    style={{
                        fontSize: "1.25rem",
                        fontWeight: 600,
                        textDecoration: "underline",
                    }}
                >
                    {challenge?.title}
                </p>
            </Flex>
            <span>
                将从题库中软删除，但无法恢复。所有与之相关的数据会得到保留。请问你确定要删除这道题目吗？
            </span>
            <Flex width={"100%"} justify={"flex-end"}>
                <Button
                    variant={"solid"}
                    color={"error"}
                    onClick={handleChallengeDelete}
                >
                    确定
                </Button>
            </Flex>
        </Stack>
    );
}
