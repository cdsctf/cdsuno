import * as React from "react";
import { cn } from "@/utils";
import { cva } from "class-variance-authority";
import { Button } from "./button";

const inputVariants = cva(
    [
        "flex-1",
        "flex",
        "h-12",
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
        "placeholder:text-muted-foreground",
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
            icon: {
                true: "rounded-l-none",
            },
            extraBtn: {
                true: "rounded-r-none",
            },
        },
        defaultVariants: {
            icon: false,
            extraBtn: false,
        },
    }
);

export interface InputProps extends React.ComponentProps<"input"> {
    icon?: React.ReactElement;
    extraBtn?: React.ReactElement;
    inputClassName?: string;
}

function Input(props: InputProps) {
    const { icon, extraBtn, className, inputClassName, type, ref, ...rest } =
        props;
    return (
        <div className={cn(["flex", "flex-row", "items-center"], className)}>
            {icon && (
                <div
                    className={cn([
                        "rounded-l-md",
                        "flex",
                        "items-center",
                        "justify-center",
                        "h-12",
                        "aspect-square",
                        "bg-primary/20",
                    ])}
                >
                    {icon}
                </div>
            )}
            <input
                type={type}
                className={cn(
                    inputVariants({
                        icon: !!icon,
                        extraBtn: !!extraBtn,
                        className: inputClassName,
                    })
                )}
                ref={ref}
                {...rest}
            />
            {extraBtn && (
                <Button
                    asChild
                    size={"sm"}
                    type={"button"}
                    className={cn([
                        "rounded-l-none",
                        "flex",
                        "shrink-0",
                        "flex-row",
                        "items-center",
                        "justify-center",
                        "h-12",
                        "aspect-square",
                        "bg-primary/20",
                        "hover:bg-primary/30",
                    ])}
                >
                    {extraBtn}
                </Button>
            )}
        </div>
    );
}

export { Input };
