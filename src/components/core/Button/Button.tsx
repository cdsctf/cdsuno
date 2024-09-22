import React, { ComponentProps, forwardRef } from "react";
import chroma from "chroma-js";
import useThemeColor from "@/hooks/useThemeColor";
import styles from "./Button.module.scss";
import Loading from "../../icons/Loading";

export interface ButtonProps extends ComponentProps<"button"> {
    color?: string;
    variant?: "solid" | "outlined" | "ghost";
    justify?: "start" | "center" | "end";
    align?: "start" | "center" | "end";
    loading?: boolean;
    disabled?: boolean;
    icon?: React.ReactNode;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (props, ref) => {
        const {
            color = "primary",
            variant = "solid",
            loading = false,
            style,
            className,
            children,
            disabled,
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
                className={`${styles["root"]} ${loading ? styles["loading"] : ""} ${disabled ? styles["disabled"] : ""}`}
                style={variables}
            >
                <button
                    ref={ref}
                    className={`${styles["button"]} ${styles[variant]} ${className}`}
                    style={style}
                    disabled={disabled || loading}
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
);
