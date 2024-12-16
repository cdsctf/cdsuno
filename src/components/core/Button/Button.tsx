import React, { ComponentPropsWithRef, CSSProperties } from "react";
import useThemeColor from "@/hooks/useThemeColor";
import styles from "./Button.module.scss";
import Loading from "~icons/svg-spinners/180-ring-with-bg";
import clsx from "clsx";
import { Box } from "../Box";
import { ThemeColor } from "@/types/theme";

export interface ButtonProps extends ComponentPropsWithRef<"button"> {
    width?: number | string;
    height?: string;
    color?: ThemeColor | string;
    variant?: "solid" | "outlined" | "ghost";
    justify?: "start" | "center" | "end";
    align?: "start" | "center" | "end";
    radius?: string | number;
    shadow?: "none" | "sm" | "md" | "lg" | "xl";
    loading?: boolean;
    disabled?: boolean;
    icon?: React.ReactElement;
    style?: CSSProperties;
    children?: React.ReactNode;
}

export function Button(props: ButtonProps) {
    const {
        width = "auto",
        height = "auto",
        color = "primary",
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

    return (
        <button
            ref={ref}
            className={clsx(styles["root"], className)}
            data-disabled={disabled}
            data-loading={loading}
            data-variant={variant}
            style={{ ...variables, ...style }}
            disabled={disabled || loading}
            {...rest}
        >
            {(loading || icon) && (
                <Box className={styles["icon"]}>
                    {loading ? <Loading /> : icon}
                </Box>
            )}
            {children && <Box className={styles["content"]}>{children}</Box>}
        </button>
    );
}
