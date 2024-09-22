import React, { ComponentProps } from "react";
import useThemeColor from "@/hooks/useThemeColor";
import styles from "./InputWrapper.module.scss";

export interface InputWrapperProps extends ComponentProps<"div"> {
    width?: string;
    color?: string;
    variant?: "outlined" | "solid";
    invalid?: boolean;
    label?: string;
    helperText?: string;
    errorText?: string;
    style?: React.CSSProperties;
    className?: string;
    children?: React.ReactNode;
}

export function InputWrapper(props: InputWrapperProps) {
    const {
        width = "fit-content",
        color = "primary",
        invalid = false,
        variant = "outlined",
        label = "",
        helperText = "",
        errorText = "",
        style,
        className,
        children,
        ...rest
    } = props;

    const baseColor = useThemeColor(color);

    const variables = {
        "--width": width,
        "--bg-color": baseColor,
        "--border-color": baseColor,
    } as React.CSSProperties;

    return (
        <div className={styles["root"]} style={variables} {...rest}>
            {label && <label className={styles["label"]}>{label}</label>}
            {helperText && (
                <label className={styles["helper-text"]}>{helperText}</label>
            )}
            <div
                className={`${styles["wrapper"]} ${className}`}
                data-variant={variant}
            >
                {children}
            </div>
            {invalid && (
                <label className={styles["error-text"]}>{errorText}</label>
            )}
        </div>
    );
}
