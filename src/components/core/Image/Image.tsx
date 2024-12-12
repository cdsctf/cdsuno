import React, { ComponentProps, useState } from "react";
import styles from "./Image.module.scss";
import Loading from "~icons/svg-spinners/180-ring-with-bg";
import { Box } from "../Box";

export interface ImageProps extends ComponentProps<"img"> {
    src?: string;
    width?: string;
    height?: string;
    fallback?: React.ReactNode;
}

export function Image(props: ImageProps) {
    const { src, width = "fit-content", height = "100%", style } = props;

    const [err, setErr] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const variables = {
        "--width": width,
        "--height": height,
    } as React.CSSProperties;

    return (
        <Box
            className={styles["root"]}
            style={{
                ...variables,
                ...style,
            }}
        >
            <img
                className={styles["img"]}
                src={src}
                alt={""}
                onLoad={() => setLoading(false)}
                onError={() => setErr(true)}
                draggable={false}
            />
            {loading && (
                <Box className={styles["loading"]}>
                    <Box className={styles["loading-icon"]}>
                        <Loading />
                    </Box>
                </Box>
            )}
        </Box>
    );
}
