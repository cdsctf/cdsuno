import { ComponentProps, CSSProperties } from "react";
import styles from "./IconButton.module.scss";
import useThemeColor from "@/hooks/useThemeColor";
import { Box } from "../Box";

export interface IconButtonProps extends ComponentProps<"button"> {
    size?: string | number;
    variant?: "solid" | "outlined" | "subtle" | "ghost";
    radius?: string;
    loading?: boolean;
    disabled?: boolean;
    color?: string;
    style?: CSSProperties;
    children?: React.ReactNode;
}

export function IconButton(props: IconButtonProps) {
    const {
        size = 36,
        variant = "solid",
        radius = "12px",
        color = "primary",
        loading = false,
        disabled = false,
        children,
        ref,
        ...rest
    } = props;

    const baseColor = useThemeColor(color);

    const variables = {
        "--icon-button-height": typeof size === "string" ? size : `${size}px`,
        "--icon-button-bg-color": baseColor,
        "--icon-button-text-color": variant === "solid" ? "#fff" : baseColor,
        "--icon-button-radius": radius,
    } as CSSProperties;

    return (
        <button
            ref={ref}
            className={styles["root"]}
            style={variables}
            data-disabled={disabled}
            data-loading={loading}
            data-variant={variant}
            disabled={disabled || loading}
            {...rest}
        >
            <Box className={styles["content"]}>{children}</Box>
        </button>
    );
}
