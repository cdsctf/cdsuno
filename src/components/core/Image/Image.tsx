import React, { ComponentProps, useState, useEffect } from "react";
import styles from "./Image.module.scss";
import Loading from "~icons/svg-spinners/180-ring-with-bg";
import { Box } from "../Box";
import clsx from "clsx";
import Flag2BoldDuotone from "~icons/solar/flag-2-bold-duotone";

export interface ImageProps extends ComponentProps<"img"> {
    src?: string;
    width?: string;
    height?: string;
    radius?: number | string;
    fallback?: React.ReactNode;
}

export function Image(props: ImageProps) {
    const {
        src,
        width = "fit-content",
        height = "100%",
        radius = 12,
        fallback = (
            <Flag2BoldDuotone
                style={{
                    color: "light-dark(var(--color-primary), white)",
                    width: "35%",
                    height: "35%",
                }}
            />
        ),
        className,
        style,
    } = props;

    const [err, setErr] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentSrc, setCurrentSrc] = useState<string | undefined>(src);

    useEffect(() => {
        setErr(false);
        setLoading(true);
        setCurrentSrc(src);
    }, [src]);

    const variables = {
        "--image-width": width,
        "--image-height": height,
        "--image-radius": typeof radius === "string" ? radius : `${radius}px`,
    } as React.CSSProperties;

    return (
        <Box
            className={clsx(styles["root"], className)}
            style={{
                ...style,
                ...variables,
            }}
        >
            {err && fallback}
            {!err && (
                <>
                    <img
                        className={styles["img"]}
                        src={currentSrc}
                        alt={""}
                        onLoad={() => setLoading(false)}
                        onError={() => setErr(true)}
                        draggable={false}
                    />
                    {loading && (
                        <Box className={styles["loading"]}>
                            <Box className={styles["loading-icon"]}>
                                <Loading
                                    color={
                                        "light-dark(var(--color-primary), white)"
                                    }
                                />
                            </Box>
                        </Box>
                    )}
                </>
            )}
        </Box>
    );
}
