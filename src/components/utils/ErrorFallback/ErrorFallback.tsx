import { Box, Button, Stack } from "@/components/core";
import { FallbackProps } from "react-error-boundary";
import styles from "./ErrorFallback.module.scss";
import SolarPlanet2BoldDuotone from "~icons/solar/planet-2-bold-duotone";
import { Textarea } from "@/components/core/Textarea";
import { Flex } from "@/components/core/Flex";
import RestartBold from "~icons/solar/restart-bold";
import DocumentAddBold from "~icons/solar/document-add-bold";

export function ErrorFallback(props: FallbackProps) {
    const { error, resetErrorBoundary } = props;

    return (
        <Stack className={styles["root"]}>
            <Flex
                width={"100%"}
                align={"center"}
                justify={"center"}
                className={styles["nav"]}
            >
                <Box className={styles["icon"]}>
                    <SolarPlanet2BoldDuotone />
                </Box>
                <h2 className={styles["title"]}>好像出了点问题</h2>
            </Flex>
            <Textarea value={error.stack} width="45vw" height="40vh" readOnly />
            <Flex
                width={"100%"}
                className={styles["actions"]}
                align={"center"}
                gap={10}
            >
                <Button
                    width={"100%"}
                    onClick={resetErrorBoundary}
                    icon={<RestartBold />}
                >
                    重置
                </Button>
                <Button
                    icon={<DocumentAddBold />}
                    width={"100%"}
                    onClick={() => console.log(error)}
                >
                    查看错误信息
                </Button>
            </Flex>
        </Stack>
    );
}
