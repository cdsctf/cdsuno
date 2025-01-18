import useThemeColor from "@/hooks/useThemeColor";
import "./Badge.scss";
import chroma from "chroma-js";
import { CSSProperties, ComponentProps } from "react";
import clsx from "clsx";
import { Box } from "../Box";

export interface BadgeProps extends ComponentProps<"div"> {
    variant?: "solid" | "light" | "outlined";
    color?: string;
    children: React.ReactNode;
}

export function Badge(props: BadgeProps) {
    const {
        variant = "solid",
        color = "primary",
        children,
        className,
        style,
        ...rest
    } = props;

    const baseColor = useThemeColor(color);

    const bgColor = () => {
        switch (variant) {
            case "solid":
                return baseColor;
            case "light":
            case "outlined":
                return chroma(baseColor).alpha(0.5).hex();
        }
    };

    const borderColor = () => {
        switch (variant) {
            case "solid":
            case "light":
                return "transparent";
            case "outlined":
                return baseColor;
        }
    };

    const variables = {
        "--badge-bg-color": bgColor(),
        "--badge-border-color": borderColor(),
        "--badge-text-color": "#FFFFFF",
    } as CSSProperties;

    return (
        <Box
            className={clsx("badge", className)}
            style={{ ...variables, ...style }}
            {...rest}
        >
            <Box className={"badge-content"}>{children}</Box>
        </Box>
    );
}
