import React, { CSSProperties, Ref } from "react";
import useThemeColor from "@/hooks/useThemeColor";
import Loading from "~icons/svg-spinners/180-ring-with-bg";
import clsx from "clsx";
import { Box } from "../Box";
import { ThemeColor } from "@/types/theme";
import { Link, To } from "react-router";
import styles from "./Button.module.scss";

export interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
    color?: ThemeColor | string;
    to?: To;
    type?: "button" | "submit" | "reset";
    variant?: "solid" | "outlined" | "tonal" | "subtle" | "ghost" | "text";
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
        color = "primary",
        to,
        type = "button",
        variant = "solid",
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
        "--button-bg-color": baseColor,
        "--button-text-color": variant === "solid" ? "#fff" : baseColor,
    } as CSSProperties;

    const Element = (to ? Link : "button") as React.ElementType;

    return (
        <Element
            ref={ref as Ref<HTMLButtonElement | HTMLAnchorElement>}
            {...(to ? { to: !disabled ? to : "" } : {})}
            className={clsx(styles["button"], className)}
            data-variant={variant}
            data-disabled={disabled}
            data-loading={loading}
            style={{ ...variables, ...style }}
            disabled={disabled || loading}
            {...(!to ? { type: type } : {})}
            {...rest}
        >
            {(loading || icon) && (
                <Box
                    className={clsx(
                        "inline-block",
                        "text-[1rem] text-[light-dark(var(--button-text-color),#ffffff)]"
                    )}
                >
                    {loading ? <Loading /> : icon}
                </Box>
            )}
            {children}
        </Element>
    );
}
