import * as React from "react";
import { cn } from "@/utils";
import { cva, VariantProps } from "class-variance-authority";
import { Button } from "./button";
import { LucideIcon } from "lucide-react";

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
        "placeholder:text-primary/80",
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

export interface InputProps
    extends Partial<Omit<React.ComponentProps<"input">, "size">> {
    size?: "sm" | "md";
    icon?: LucideIcon;
    extraBtn?: React.ReactElement;
    inputClassName?: string;
}

function Input(props: InputProps) {
    const {
        size,
        icon,
        extraBtn,
        className,
        inputClassName,
        type,
        ref,
        ...rest
    } = props;
    return (
        <div className={cn(["flex", "flex-row", "items-center"], className)}>
            {icon && <IconSection icon={icon} size={size} />}
            <input
                type={type}
                className={cn(
                    inputVariants({
                        size,
                        icon: !!icon,
                        extraBtn: !!extraBtn,
                        className: inputClassName,
                    })
                )}
                ref={ref}
                {...rest}
            />
            {extraBtn && <ExtraBtnSection extraBtn={extraBtn} size={size} />}
        </div>
    );
}

const iconSectionVariants = cva(
    [
        "rounded-l-md",
        "flex",
        "items-center",
        "justify-center",
        "aspect-square",
        "bg-primary/20",
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

interface IconSectionProps extends VariantProps<typeof iconSectionVariants> {
    icon: LucideIcon;
}

function IconSection(props: IconSectionProps) {
    const { icon, size, ...rest } = props;

    const Icon = icon;

    return (
        <div className={cn(iconSectionVariants({ size }))} {...rest}>
            <Icon className={cn(["size-4"])} />
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

export { Input };
