import React, { ComponentProps } from "react";
import chroma from "chroma-js";
import styles from "@/styles/components/atoms/button.module.scss";
import { getColor } from "@/utils/color";

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
        jusitify = "center",
        align = "center",
        loading = false,
        rounded = "lg",
        children,
        ...rest
    } = props;

    const variables = {
        "--btn-bg-color": getColor(color),
        "--btn-bg-secondary-color": `${chroma(getColor(color)).darken(0.5)}`,
        "--btn-text-color": variant === "solid" ? "#fff" : getColor(color),
    } as React.CSSProperties;

    const btnClasses = [
        styles.btn,
        styles[size],
        styles[variant],
        loading ? styles.loading : "",
    ].join(" ");

    return (
        <button className={btnClasses} style={variables} {...rest}>
            <span>{children}</span>
        </button>
    );
}
