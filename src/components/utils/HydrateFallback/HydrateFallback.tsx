import { Box, Flex } from "@/components/core";
import styles from "./HydrateFallback.module.scss";
import Loading from "~icons/svg-spinners/180-ring-with-bg";

export function HydrateFallback() {
    return (
        <Box className={styles["root"]}>
            <Flex
                gap={"15px"}
                width={"100%"}
                align={"center"}
                justify={"center"}
                style={{
                    color: "light-dark(var(--color-primary), #fff)",
                }}
            >
                <Box>
                    <Loading />
                </Box>
                <Box>加载中</Box>
            </Flex>
        </Box>
    );
}
