import React, { ComponentProps } from "react";
import chroma from "chroma-js";
import styles from "@/styles/components/atoms/button.module.scss";
import useThemeColor from "@/hooks/useThemeColor";

export interface ButtonProps extends ComponentProps<"button"> {
    color?: string;
    size?: "sm" | "md" | "lg";
    variant?: "solid" | "outline" | "ghost";
    jusitify?: "start" | "center" | "end";
    align?: "start" | "center" | "end";
    loading?: boolean;
}

export default function Button(
    props: ButtonProps & { children?: React.ReactNode }
) {
    const {
        color = "primary",
        size = "md",
        variant = "solid",
        loading = false,
        children,
        ...rest
    } = props;

    const baseColor = useThemeColor(color);

    const variables = {
        "--btn-bg-color": baseColor,
        "--btn-bg-secondary-color": `${chroma.valid(baseColor) ? chroma(baseColor).darken(0.5) : baseColor}`,
        "--btn-text-color": variant === "solid" ? "#fff" : baseColor,
    } as React.CSSProperties;

    return (
        <button
            className={`${styles["root"]} ${styles[size]} ${styles[variant]} ${loading ? styles["loading"] : ""} ${rest.className}`}
            style={variables}
            align-items={"center"}
            {...rest}
        >
            <div className={styles["content"]}>{children}</div>
        </button>
    );
}
