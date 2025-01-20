import { Box } from "@/components/core";
import styles from "./HydrateFallback.module.scss";
import Loading from "~icons/svg-spinners/180-ring-with-bg";

export function HydrateFallback() {
    return (
        <Box className={styles["root"]}>
            <Box
                className={
                    "flex items-center justify-center gap-[15px] text-primary dark:text-[white]"
                }
            >
                <Box>
                    <Loading />
                </Box>
                <Box>加载中</Box>
            </Box>
        </Box>
    );
}
