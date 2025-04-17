import * as React from "react";
import { cn } from "@/utils";
import { cva } from "class-variance-authority";
import { Button } from "./button";
import { LucideIcon } from "lucide-react";
import { IconSection } from "./shared/icon-section";

const InputContext = React.createContext<{
    size?: "sm" | "md";
    disabled?: boolean;
    hasIcon?: boolean;
    hasExtraButton?: boolean;
}>({});

interface InputRootProps extends React.ComponentProps<"div"> {
    size?: "sm" | "md";
    disabled?: boolean;
}
function InputRoot(props: InputRootProps) {
    const { className, size, disabled, children, ref, ...rest } = props;

    let hasIcon = false;
    let hasExtraButton = false;

    React.Children.forEach(children, (child) => {
        if (!React.isValidElement(child)) return;

        const type = child.type;

        if (type === InputIcon) hasIcon = true;
        if (type === InputExtraButton) hasExtraButton = true;
    });

    return (
        <InputContext.Provider
            value={{ size, disabled, hasIcon, hasExtraButton }}
        >
            <div className={cn(["flex", "items-center"], className)} {...rest}>
                {children}
            </div>
        </InputContext.Provider>
    );
}

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

interface InputIconProps {
    icon: LucideIcon;
}

const InputIcon = ({ icon }: InputIconProps) => {
    const { size } = React.useContext(InputContext);
    return <IconSection icon={icon} size={size} />;
};

interface InputExtraButtonProps extends React.ComponentProps<typeof Button> {}

function InputExtraButton(props: InputExtraButtonProps) {
    const { className, children, ...rest } = props;
    const { size } = React.useContext(InputContext);

    return (
        <Button
            // ref={ref}
            size={size}
            type={"button"}
            className={cn(extraBtnSection({ size }), className)}
            {...rest}
        >
            {children}
        </Button>
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

export {
    InputRoot as Input,
    TextField,
    InputIcon,
    InputExtraButton,
    inputVariants,
};
