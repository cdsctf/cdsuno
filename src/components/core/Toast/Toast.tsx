import React, { CSSProperties } from "react";
import InfoCircleBold from "~icons/solar/info-circle-bold";
import styles from "./Toast.module.scss";
import useThemeColor from "@/hooks/useThemeColor";
import chroma from "chroma-js";
import { ComponentProps } from "react";
import { Icon } from "../Icon";

export interface ToastProps extends ComponentProps<"div"> {
    id?: string;
    title?: string;
    description?: string;
    color?: string;
    icon?: React.ReactElement;
    type?: string;
}

export function Toast(props: ToastProps) {
    const {
        id,
        title,
        description,
        color = "primary",
        icon = <InfoCircleBold />,
        type,
        ...rest
    } = props;

    const baseColor = useThemeColor(color);

    const variables = {
        "--toast-bg-color": chroma(baseColor).hex(),
        "--toast-grid-color": chroma(baseColor).darken(1).alpha(0.1).hex(),
        "--toast-text-color": chroma(baseColor).darken(1.75).hex(),
        "--toast-border-color": baseColor,
    } as CSSProperties;

    return (
        <div className={styles["root"]} style={variables} {...rest}>
            <div className={styles["icon"]}>
                <Icon icon={icon} />
            </div>
            <div className={styles["content-wrapper"]}>
                <h2 className={styles["title"]}>{title}</h2>
                <p className={styles["description"]}>{description}</p>
            </div>
        </div>
    );
}
