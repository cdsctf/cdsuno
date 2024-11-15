import React, { ComponentProps, useState } from "react";
import styles from "./Image.module.scss";
import Loading from "@/components/icons/Loading";

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
        <div
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
                <div className={styles["loading"]}>
                    <div className={styles["loading-icon"]}>
                        <Loading />
                    </div>
                </div>
            )}
        </div>
    );
}
