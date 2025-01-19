import React, { ComponentProps } from "react";
import useThemeColor from "@/hooks/useThemeColor";
import clsx from "clsx";
import { Field as ArkField } from "@ark-ui/react";
import { Box } from "../../Box";

export interface InputBaseProps extends ComponentProps<"div"> {
    width?: string;
    minHeight?: string;
    color?: string;
    variant?: "outlined" | "solid";
    invalid?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    label?: string;
    helperText?: string;
    errorText?: string;
    icon?: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
    wrapperClassName?: string;
    children?: React.ReactNode;
}

export function InputBase(props: InputBaseProps) {
    const {
        width = "fit-content",
        minHeight: height = "fit-content",
        color = "primary",
        invalid = false,
        disabled = false,
        readOnly = false,
        variant = "outlined",
        icon,
        label = "",
        helperText = "",
        errorText = "",
        style,
        className,
        wrapperClassName,
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
            className={clsx(
                "w-[var(--input-width)] h-[var(--input-height)]",
                "flex flex-col items-start justify-start",
                "rounded-[12px]",
                className
            )}
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
                <Box className={"flex items-end w-fit m-[5px] gap-[5px]"}>
                    <ArkField.Label
                        className={
                            "inline-block text-[1em] line-height-[1.25em]"
                        }
                    >
                        {label}
                    </ArkField.Label>
                    {!invalid && (
                        <ArkField.HelperText
                            className={"text-[0.7em] text-gray"}
                        >
                            {helperText}
                        </ArkField.HelperText>
                    )}
                    {invalid && (
                        <ArkField.ErrorText
                            className={"text-[0.7em] text-error"}
                        >
                            {errorText}
                        </ArkField.ErrorText>
                    )}
                </Box>
            )}
            <Box
                className={clsx(
                    "w-full h-full",
                    "rounded-[12px] shadow-[var(--input-shadow)]",
                    "flex items-center relative gap-[8px]",
                    "border-[1px] border-solid border-[var(--input-border-color)]",
                    "px-[12px] py-[6.75px]",
                    "transition-all duration-200 ease-in-out",
                    "data-[variant=solid]:(bg-[var(--input-bg-color)] text-white)",
                    "data-[variant=outlined]:(bg-[var(--bg-2nd-color)] text-[var(--input-border-color)])",
                    "hover:(brightness-[1.125])",
                    "focus:(brightness-[1.125])",
                    "data-[disabled=true]:(cursor-not-allowed opacity-[0.5])",
                    wrapperClassName
                )}
                data-variant={variant}
                data-disabled={disabled}
                ref={ref}
            >
                {icon && <Box>{icon}</Box>}
                {children}
            </Box>
        </ArkField.Root>
    );
}
