import { ComponentProps, CSSProperties } from "react";
import styles from "./IconButton.module.scss";
import useThemeColor from "@/hooks/useThemeColor";
import { Box } from "../Box";

export interface IconButtonProps extends ComponentProps<"button"> {
    height?: string;
    variant?: "solid" | "outlined" | "subtle" | "transparent";
    loading?: boolean;
    disabled?: boolean;
    color?: string;
    style?: CSSProperties;
    children?: React.ReactNode;
}

export function IconButton(props: IconButtonProps) {
    const {
        height = "36px",
        variant = "solid",
        color = "primary",
        loading = false,
        disabled = false,
        children,
        ref,
        ...rest
    } = props;

    const baseColor = useThemeColor(color);

    const variables = {
        "--icon-button-height": height,
        "--icon-button-bg-color": baseColor,
        "--icon-button-text-color": variant === "solid" ? "#fff" : baseColor,
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
