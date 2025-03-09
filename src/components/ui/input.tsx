import * as React from "react";
import { cn } from "@/utils";
import { cva, VariantProps } from "class-variance-authority";
import { Button } from "./button";
import { LucideIcon } from "lucide-react";
import { IconSection } from "./shared/icon-section";

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

export interface InputProps extends React.ComponentProps<"div"> {
    size?: "sm" | "md";
    icon?: LucideIcon;
    extraBtn?: React.ReactElement;
    slotProps?: {
        input?: React.ComponentProps<"input">;
    };
    disabled?: React.ComponentProps<"input">["disabled"];
    type?: React.ComponentProps<"input">["type"];
    value?: React.ComponentProps<"input">["value"];
    placeholder?: React.ComponentProps<"input">["placeholder"];
    onChange?: React.ComponentProps<"input">["onChange"];
    onFocus?: React.ComponentProps<"input">["onFocus"];
    onBlur?: React.ComponentProps<"input">["onBlur"];
}

function Input(props: InputProps) {
    const {
        size,
        icon,
        extraBtn,
        className,
        disabled,
        type,
        onChange,
        value,
        placeholder,
        onFocus,
        onBlur,
        slotProps,
        ref,
        ...rest
    } = props;
    return (
        <div className={cn(["flex", "items-center", className])} {...rest}>
            {icon && <IconSection icon={icon} size={size} />}
            <input
                {...slotProps?.input}
                disabled={disabled}
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                className={cn(
                    inputVariants({
                        size,
                        icon: !!icon,
                        extraBtn: !!extraBtn,
                        className: slotProps?.input?.className,
                    })
                )}
            />
            {extraBtn && <ExtraBtnSection extraBtn={extraBtn} size={size} />}
        </div>
    );
}

const extraBtnSection = cva(
    [
        "rounded-l-none",
        "flex",
        "shrink-0",
        "flex-row",
        "items-center",
        "justify-center",
        "aspect-square",
        "bg-primary/20",
        "hover:bg-primary/30",
    ],
    {
        variants: {
            size: {
                sm: "h-10",
                md: "h-12",
            },
        },
        defaultVariants: {
            size: "md",
        },
    }
);

interface ExtraBtnSectionProps extends VariantProps<typeof extraBtnSection> {
    extraBtn?: React.ReactElement;
}

function ExtraBtnSection(props: ExtraBtnSectionProps) {
    const { size, extraBtn, ...rest } = props;

    return (
        <Button
            asChild
            size={size}
            type={"button"}
            className={cn(extraBtnSection({ size }))}
            {...rest}
        >
            {extraBtn}
        </Button>
    );
}

export { Input, inputVariants };
