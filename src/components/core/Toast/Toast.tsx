import React, { CSSProperties } from "react";
import InfoCircleBold from "~icons/solar/info-circle-bold";
import styles from "./Toast.module.scss";
import { ComponentProps } from "react";
import { Box } from "../Box";

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

    const variables = {
        "--toast-color": `var(--color-${color})`,
    } as CSSProperties;

    return (
        <Box className={styles["root"]} style={variables} {...rest}>
            <Box className={styles["icon"]}>{icon}</Box>
            <Box className={styles["content-wrapper"]}>
                <h2 className={styles["title"]}>{title}</h2>
                <p className={styles["description"]}>{description}</p>
            </Box>
        </Box>
    );
}
