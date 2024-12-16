import { Box, Flex } from "@/components/core";
import styles from "./Tip.module.scss";
import ArrowDownBold from "~icons/solar/arrow-down-bold";

export function Tip() {
    return (
        <Flex className={styles["root"]} gap={5} align={"center"}>
            <Box className={styles["icon"]}>
                <ArrowDownBold />
            </Box>
            <span>向下滑动查看全部比赛</span>
        </Flex>
    );
}
