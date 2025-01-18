import React, { CSSProperties, Ref } from "react";
import useThemeColor from "@/hooks/useThemeColor";
import Loading from "~icons/svg-spinners/180-ring-with-bg";
import "./Button.scss";
import clsx from "clsx";
import { Box } from "../Box";
import { ThemeColor } from "@/types/theme";
import { Link, To } from "react-router";

export interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
    width?: number | string;
    height?: string;
    color?: ThemeColor | string;
    to?: To;
    type?: "button" | "submit" | "reset";
    variant?: "solid" | "outlined" | "tonal" | "subtle" | "ghost" | "text";
    radius?: string | number;
    shadow?: "none" | "sm" | "md" | "lg" | "xl";
    loading?: boolean;
    disabled?: boolean;
    icon?: React.ReactNode;
    style?: CSSProperties;
    className?: string;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLElement>;
}

export function Button(props: ButtonProps) {
    const {
        width = "auto",
        height = "2.5rem",
        color = "primary",
        to,
        type = "button",
        variant = "solid",
        radius = 12,
        shadow = "md",
        loading = false,
        style,
        className,
        children,
        disabled,
        icon,
        ref,
        ...rest
    } = props;

    const baseColor = useThemeColor(color);

    const variables = {
        "--button-width": typeof width === "string" ? width : `${width}px`,
        "--button-height": height,
        "--button-bg-color": baseColor,
        "--button-text-color": variant === "solid" ? "#fff" : baseColor,
        "--button-radius": typeof radius === "string" ? radius : `${radius}px`,
        "--button-shadow": `var(--shadow-${shadow})`,
    } as CSSProperties;

    const Element = (to ? Link : "button") as React.ElementType;

    return (
        <Element
            ref={ref as Ref<HTMLButtonElement | HTMLAnchorElement>}
            {...(to ? { to: !disabled ? to : "" } : {})}
            className={clsx("button", className)}
            data-disabled={disabled}
            data-loading={loading}
            data-variant={variant}
            data-icon-btn={!children}
            style={{ ...variables, ...style }}
            disabled={disabled || loading}
            {...(!to ? { type: type } : {})}
            {...rest}
        >
            {(loading || icon) && (
                <Box className={"button-icon"}>
                    {loading ? <Loading /> : icon}
                </Box>
            )}
            {children}
        </Element>
    );
}
