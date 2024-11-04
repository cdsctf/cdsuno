import React, {
    ComponentProps,
    ComponentPropsWithRef,
    forwardRef,
} from "react";
import chroma from "chroma-js";
import useThemeColor from "@/hooks/useThemeColor";
import styles from "./Button.module.scss";
import Loading from "../../icons/Loading";

export interface ButtonProps extends ComponentPropsWithRef<"button"> {
    width?: string;
    height?: string;
    color?: string;
    variant?: "solid" | "outlined" | "ghost";
    justify?: "start" | "center" | "end";
    align?: "start" | "center" | "end";
    loading?: boolean;
    disabled?: boolean;
    icon?: React.ReactNode;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (props, ref) => {
        const {
            width = "fit-content",
            height = "auto",
            color = "primary",
            variant = "solid",
            loading = false,
            style,
            className,
            children,
            disabled,
            icon,
            ...rest
        } = props;

        const baseColor = useThemeColor(color);

        const variables = {
            "--button-width": width,
            "--button-height": height,
            "--button-bg-color": baseColor,
            "--button-text-color": variant === "solid" ? "#fff" : baseColor,
        } as React.CSSProperties;

        return (
            <button
                ref={ref}
                className={`${styles["root"]} ${className}`}
                data-disabled={disabled}
                data-loading={loading}
                data-variant={variant}
                style={{ ...variables, ...style }}
                disabled={disabled || loading}
                {...rest}
            >
                {(loading || icon) && (
                    <div className={styles["icon"]}>
                        {loading ? <Loading /> : icon}
                    </div>
                )}
                <div className={styles["content"]}>{children}</div>
            </button>
        );
    }
);
