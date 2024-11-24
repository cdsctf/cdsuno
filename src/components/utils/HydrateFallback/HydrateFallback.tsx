import { Box } from "@/components/core/Box";
import styles from "./HydrateFallback.module.scss";
import { Icon } from "@/components/core/Icon";
import { Stack } from "@/components/core/Stack/Stack";
import { Flex } from "@/components/core/Flex";
import Loading from "@/components/icons/Loading";

export function HydrateFallback() {
    return (
        <Box className={styles["root"]}>
            <Stack gap={"15px"} align={"center"}>
                <Flex gap={"15px"}>
                    <Icon icon={<Loading />} />
                    <Box>加载中</Box>
                </Flex>
            </Stack>
        </Box>
    );
}
