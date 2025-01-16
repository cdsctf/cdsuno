import React, { ComponentProps } from "react";
import useThemeColor from "@/hooks/useThemeColor";
import styles from "./InputBase.module.scss";
import clsx from "clsx";
import { Field as ArkField } from "@ark-ui/react";
import { Box } from "../../Box";

export interface InputBaseProps extends ComponentProps<"div"> {
    width?: string;
    height?: string;
    color?: string;
    variant?: "outlined" | "solid";
    invalid?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
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
        disabled = false,
        readOnly = false,
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
    const errorColor = useThemeColor("error");

    const variables = {
        "--input-width": width,
        "--input-height": height,
        "--input-bg-color": invalid ? errorColor : baseColor,
        "--input-border-color": invalid ? errorColor : baseColor,
    } as React.CSSProperties;

    return (
        <ArkField.Root
            className={styles["root"]}
            style={{
                ...variables,
                ...style,
            }}
            invalid={invalid}
            disabled={disabled}
            readOnly={readOnly}
            {...rest}
        >
            {(label || helperText) && (
                <Box className={styles["info"]}>
                    <ArkField.Label className={styles["label"]}>
                        {label}
                    </ArkField.Label>
                    {!invalid && (
                        <ArkField.HelperText className={styles["helper-text"]}>
                            {helperText}
                        </ArkField.HelperText>
                    )}
                    {invalid && (
                        <ArkField.ErrorText className={styles["error-text"]}>
                            {errorText}
                        </ArkField.ErrorText>
                    )}
                </Box>
            )}
            <Box
                className={clsx(styles["wrapper"], className)}
                data-variant={variant}
                data-disabled={disabled}
                ref={ref}
            >
                {children}
            </Box>
        </ArkField.Root>
    );
}
