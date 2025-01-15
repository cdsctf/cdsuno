import { Box, Flex, Stack } from "@/components/core";
import { Challenge } from "@/models/challenge";
import TrashBinTrashBold from "~icons/solar/trash-bin-trash-bold";
import styles from "./ChallengeDeleteModal.module.scss";

export interface ChallengeDeleteModalProps {
    challenge?: Challenge;
}

export function ChallengeDeleteModal(props: ChallengeDeleteModalProps) {
    const { challenge } = props;

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
            <p style={{ fontSize: "0.875rem" }}>
                {challenge?.title}{" "}
                将从题库中删除，并且无法恢复。所有与此题目相关的数据（提交、赛题等）都会随之删除。
            </p>
        </Stack>
    );
}
