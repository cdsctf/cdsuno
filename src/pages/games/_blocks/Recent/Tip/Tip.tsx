import { Box } from "@/components/core";
import styles from "./Tip.module.scss";
import ArrowDownBold from "~icons/solar/arrow-down-bold";
import clsx from "clsx";

export function Tip() {
    return (
        <Box className={clsx(styles["root"], "flex items-center gap-[5px]")}>
            <Box className={styles["icon"]}>
                <ArrowDownBold />
            </Box>
            <span>向下滑动查看全部比赛</span>
        </Box>
    );
}
