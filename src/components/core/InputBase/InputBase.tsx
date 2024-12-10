import React, { ComponentProps } from "react";
import useThemeColor from "@/hooks/useThemeColor";
import styles from "./InputBase.module.scss";
import clsx from "clsx";
import { Box } from "../Box";

export interface InputBaseProps extends ComponentProps<"div"> {
    width?: string;
    height?: string;
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

export function InputBase(props: InputBaseProps) {
    const {
        width = "fit-content",
        height = "fit-content",
        color = "primary",
        invalid = false,
        variant = "outlined",
        label = "",
        helperText = "",
        errorText = "",
        style,
        className,
        children,
        ref,
        ...rest
    } = props;

    const baseColor = useThemeColor(color);

    const variables = {
        "--input-width": width,
        "--input-height": height,
        "--input-bg-color": baseColor,
        "--input-border-color": baseColor,
    } as React.CSSProperties;

    return (
        <Box
            className={styles["root"]}
            style={{
                ...variables,
                ...style,
            }}
            {...rest}
        >
            {(label || helperText) && (
                <Box className={styles["info"]}>
                    {label && (
                        <label className={styles["label"]}>{label}</label>
                    )}
                    {helperText && (
                        <label className={styles["helper-text"]}>
                            {helperText}
                        </label>
                    )}
                </Box>
            )}
            <Box
                className={clsx(styles["wrapper"], className)}
                data-variant={variant}
                ref={ref}
            >
                {children}
            </Box>
            {invalid && errorText && (
                <label className={styles["error-text"]}>{errorText}</label>
            )}
        </Box>
    );
}
