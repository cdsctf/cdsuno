import React, { ComponentProps, forwardRef } from "react";
import useThemeColor from "@/hooks/useThemeColor";
import styles from "./InputBase.module.scss";
import clsx from "clsx";

export interface InputBaseProps extends ComponentProps<"div"> {
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

export const InputBase = forwardRef<HTMLDivElement, InputBaseProps>(
    (props, ref) => {
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
            "--input-width": width,
            "--input-bg-color": baseColor,
            "--input-border-color": baseColor,
        } as React.CSSProperties;

        return (
            <div
                className={styles["root"]}
                style={{
                    ...variables,
                    ...style,
                }}
                {...rest}
            >
                {(label || helperText) && (
                    <div className={styles["info"]}>
                        {label && (
                            <label className={styles["label"]}>{label}</label>
                        )}
                        {helperText && (
                            <label className={styles["helper-text"]}>
                                {helperText}
                            </label>
                        )}
                    </div>
                )}
                <div
                    className={clsx(styles["wrapper"], className)}
                    data-variant={variant}
                    ref={ref}
                >
                    {children}
                </div>
                {invalid && errorText && (
                    <label className={styles["error-text"]}>{errorText}</label>
                )}
            </div>
        );
    }
);
