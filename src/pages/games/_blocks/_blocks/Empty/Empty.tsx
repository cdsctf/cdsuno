import { Box } from "@/components/core";
import FlagBoldDuotone from "~icons/solar/flag-bold-duotone";
import styles from "./Empty.module.scss";
import clsx from "clsx";

export function Empty() {
    return (
        <Box className={clsx(styles["root"], "flex flex-col")}>
            <FlagBoldDuotone className="text-primary dark:text-white" />
            暂无比赛
        </Box>
    );
}
