import React, { ComponentProps } from "react";
import chroma from "chroma-js";
import useThemeColor from "@/hooks/useThemeColor";
import styles from "@/styles/components/atoms/Button.module.scss";
import Loading from "../icons/Loading";

export interface ButtonProps extends ComponentProps<"button"> {
    color?: string;
    size?: "sm" | "md" | "lg";
    variant?: "solid" | "outline" | "ghost";
    jusitify?: "start" | "center" | "end";
    align?: "start" | "center" | "end";
    loading?: boolean;
    icon?: React.ReactNode;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

export default function Button(props: ButtonProps) {
    const {
        color = "primary",
        size = "md",
        variant = "solid",
        loading = false,
        style,
        children,
        icon,
        ...rest
    } = props;

    const baseColor = useThemeColor(color);

    const variables = {
        "--bg-color": baseColor,
        "--bg-secondary-color": `${chroma.valid(baseColor) ? chroma(baseColor).darken(0.5) : baseColor}`,
        "--text-color": variant === "solid" ? "#fff" : baseColor,
    } as React.CSSProperties;

    return (
        <div
            className={`${styles["root"]} ${loading ? styles["loading"] : ""}`}
            style={variables}
        >
            <button
                className={`${styles["button"]} ${styles[size]} ${styles[variant]} ${rest.className}`}
                style={style}
                align-items={"center"}
                {...rest}
            >
                {(loading || icon) && (
                    <div className={styles["icon"]}>
                        {loading ? <Loading /> : icon}
                    </div>
                )}
                <div className={styles["content"]}>{children}</div>
            </button>
        </div>
    );
}
