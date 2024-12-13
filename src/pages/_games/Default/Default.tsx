import { Image } from "@/components/core/Image";
import styles from "./Default.module.scss";
import { Box, Button, Flex, Stack } from "@/components/core";
import PlayCircleBold from "~icons/solar/play-circle-bold";

export function Default() {
    return (
        <Stack className={styles["root"]} gap={0}>
            <Stack className={styles["recent"]} width={"100%"}>
                <Box className={styles["poster"]}>
                    <Image
                        src="https://picsum.photos/1920/1080"
                        width="50%"
                        height="60vh"
                        style={{
                            boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                        }}
                    />
                    <Box className={styles["info"]}>
                        <span>CdsCTF 2024</span>
                    </Box>
                    <Box className={styles["enter"]}>
                        <Button icon={<PlayCircleBold />} height="100%">
                            进入
                        </Button>
                    </Box>
                </Box>
            </Stack>
            <Stack className={styles["all"]}>11</Stack>
        </Stack>
    );
}
