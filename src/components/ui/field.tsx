import * as React from "react";
import { cn } from "@/utils";
import { cva } from "class-variance-authority";
import { Button } from "./button";
import { LucideIcon } from "lucide-react";
import { IconSection } from "./shared/icon-section";

const FieldContext = React.createContext<{
    size?: "sm" | "md";
    disabled?: boolean;
    hasIcon?: boolean;
    hasExtraButton?: boolean;
}>({});

interface FieldRootProps extends React.ComponentProps<"div"> {
    size?: "sm" | "md";
    disabled?: boolean;
}
function FieldRoot(props: FieldRootProps) {
    const { className, size, disabled, children, ref, ...rest } = props;

    let hasIcon = false;
    let hasExtraButton = false;

    React.Children.forEach(children, (child) => {
        if (!React.isValidElement(child)) return;

        const type = child.type;

        if (type === FieldIcon) hasIcon = true;
        if (type === FieldButton) hasExtraButton = true;
    });

    return (
        <FieldContext.Provider
            value={{ size, disabled, hasIcon, hasExtraButton }}
        >
            <div className={cn(["flex", "items-center"], className)} {...rest}>
                {children}
            </div>
        </FieldContext.Provider>
    );
}

interface FieldIconProps {
    icon: LucideIcon;
}

function FieldIcon(props: FieldIconProps) {
    const { icon } = props;
    const { size } = React.useContext(FieldContext);

    return <IconSection icon={icon} size={size} />;
}

interface FieldButtonProps extends React.ComponentProps<typeof Button> {}

function FieldButton(props: FieldButtonProps) {
    const { className, children, ref, ...rest } = props;
    const { size } = React.useContext(FieldContext);

    return (
        <Button
            ref={ref}
            size={size}
            type={"button"}
            className={cn(extraBtnSection({ size }), className)}
            {...rest}
        >
            {children}
        </Button>
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

export { FieldRoot as Field, FieldIcon, FieldButton, FieldContext };
