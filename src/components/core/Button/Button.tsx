import React, { ComponentPropsWithRef, CSSProperties } from "react";
import useThemeColor from "@/hooks/useThemeColor";
import styles from "./Button.module.scss";
import Loading from "~icons/svg-spinners/180-ring-with-bg";
import clsx from "clsx";
import { Icon } from "../Icon";
import { Box } from "../Box";

export interface ButtonProps extends ComponentPropsWithRef<"button"> {
    height?: string;
    color?: string;
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
                <Icon
                    className={styles["icon"]}
                    icon={loading ? <Loading /> : icon}
                />
            )}
            {children && <Box className={styles["content"]}>{children}</Box>}
        </button>
    );
}
