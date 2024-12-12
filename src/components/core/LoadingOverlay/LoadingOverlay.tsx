import { CSSProperties } from "react";
import { Box, BoxProps } from "../Box";
import styles from "./LoadingOverlay.module.scss";
import Loading from "~icons/svg-spinners/180-ring-with-bg";
import clsx from "clsx";

export interface LoadingOverlayProps extends BoxProps {
    visible: boolean;
    zIndex?: number;
    blur?: number;
}

export function LoadingOverlay(props: LoadingOverlayProps) {
    const {
        visible = false,
        zIndex = 1000,
        blur = 2,
        className,
        style,
    } = props;

    const variables = {
        "--loading-overlay-z-index": `${zIndex}`,
        "--loading-overlay-blur": `${blur}px`,
    } as CSSProperties;

    return (
        <>
            {visible && (
                <Box
                    className={clsx(styles["root"], className)}
                    style={{
                        ...style,
                        ...variables,
                    }}
                >
                    <Box className={"icon"}>
                        <Loading color={"white"} />
                    </Box>
                </Box>
            )}
        </>
    );
}
