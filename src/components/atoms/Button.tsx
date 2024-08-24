import React, { ComponentProps, useMemo } from "react";
import chroma from "chroma-js";
import styles from "@/styles/components/atoms/button.module.scss";
import { getColor } from "@/utils/color";
import { useThemeStore } from "@/stores/theme";

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
    const themeStore = useThemeStore();

    const {
        color = "primary",
        size = "md",
        variant = "solid",
        loading = false,
        children,
        ...rest
    } = props;

    const variables = {
        "--btn-bg-color": useMemo(() => {
            return getColor(color);
        }, [themeStore.darkMode, color]),
        "--btn-bg-secondary-color": `${chroma(getColor(color)).darken(0.5)}`,
        "--btn-text-color": variant === "solid" ? "#fff" : getColor(color),
    } as React.CSSProperties;

    return (
        <button
            className={`${styles["btn"]} ${styles[size]} ${styles[variant]} ${loading ? styles["loading"] : ""} ${rest.className}`}
            style={variables}
            align-items={"center"}
            {...rest}
        >
            <div className={styles["btn-content"]}>{children}</div>
        </button>
    );
}
