import { Box, Button } from "@/components/core";
import { FallbackProps } from "react-error-boundary";
import styles from "./ErrorFallback.module.scss";
import SolarPlanet2BoldDuotone from "~icons/solar/planet-2-bold-duotone";
import { Textarea } from "@/components/core/Textarea";
import RestartBold from "~icons/solar/restart-bold";
import DocumentAddBold from "~icons/solar/document-add-bold";
import clsx from "clsx";

export function ErrorFallback(props: FallbackProps) {
    const { error, resetErrorBoundary } = props;

    return (
        <Box className={clsx(styles["root"], "flex flex-col")}>
            <Box
                className={clsx(
                    styles["nav"],
                    "flex w-full items-center justify-center"
                )}
            >
                <Box className={styles["icon"]}>
                    <SolarPlanet2BoldDuotone />
                </Box>
                <h2 className={styles["title"]}>好像出了点问题</h2>
            </Box>
            <Textarea
                value={error.stack}
                width="45vw"
                minHeight="40vh"
                maxHeight="40vh"
                readOnly
            />
            <Box
                className={clsx(
                    styles["actions"],
                    "flex items-center w-full gap-[10px]"
                )}
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
            </Box>
        </Box>
    );
}
