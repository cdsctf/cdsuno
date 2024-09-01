import InfoCircleBold from "~icons/solar/info-circle-bold";
import styles from "@/styles/components/atoms/Toast.module.scss";
import useThemeColor from "@/hooks/useThemeColor";
import chroma from "chroma-js";
import { ComponentProps } from "react";

export interface ToastProps extends ComponentProps<"div"> {
    id?: string;
    title?: string;
    description?: string;
    color?: string;
    icon?: React.ReactNode;
    type?: string;
}

export default function Toast(props: ToastProps) {
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
        "--bg-color": baseColor,
        "--border-color": baseColor,
        "--border-secondary-color": `${chroma.valid(baseColor) ? chroma(baseColor).darken(0.5) : baseColor}`,
    } as React.CSSProperties;

    return (
        <div className={styles["root"]} style={variables} {...rest}>
            <div className={styles["icon"]}>{icon}</div>
            <div className={styles["content-wrapper"]}>
                <h2 className={styles["title"]}>{title}</h2>
                <p className={styles["description"]}>{description}</p>
            </div>
        </div>
    );
}
