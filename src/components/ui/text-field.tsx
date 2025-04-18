import React from "react";
import { InputContext } from "./input";
import { cn } from "@/utils";
import { cva } from "class-variance-authority";

interface TextFieldProps extends React.ComponentProps<"input"> {}

function TextField(props: TextFieldProps) {
    const { className, ref, ...rest } = props;
    const { size, disabled, hasIcon, hasExtraButton } =
        React.useContext(InputContext);

    return (
        <input
            ref={ref}
            disabled={disabled}
            className={cn(
                inputVariants({
                    size,
                    icon: !!hasIcon,
                    extraBtn: !!hasExtraButton,
                }),
                className
            )}
            {...rest}
        />
    );
}

const inputVariants = cva(
    [
        "flex-1",
        "flex",
        "w-0",
        "rounded-md",
        "border",
        "border-input",
        "bg-input",
        "px-3",
        "py-2",
        "text-base",
        "ring-offset-input",
        "file:border-0",
        "file:bg-transparent",
        "file:text-sm",
        "file:font-medium",
        "file:text-foreground",
        "placeholder:text-secondary-foreground/80",
        "focus-visible:outline-hidden",
        "focus-visible:ring-2",
        "focus-visible:ring-ring",
        "focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed",
        "disabled:opacity-50",
        "md:text-sm",
    ],
    {
        variants: {
            size: {
                sm: "h-10",
                md: "h-12",
            },
            icon: {
                true: "rounded-l-none",
            },
            extraBtn: {
                true: "rounded-r-none",
            },
        },
        defaultVariants: {
            size: "md",
            icon: false,
            extraBtn: false,
        },
    }
);

export { TextField, inputVariants };
