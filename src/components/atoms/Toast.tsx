import InfoCircleBold from "~icons/solar/info-circle-bold";
import styles from "@/styles/components/atoms/Toast.module.scss";
import useThemeColor from "@/hooks/useThemeColor";
import { CSSTransition } from "react-transition-group";
import chroma from "chroma-js";
import { ComponentProps, useRef } from "react";

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
        title,
        description,
        color = "primary",
        icon = <InfoCircleBold />,
        type,
        ...rest
    } = props;

    const nodeRef = useRef(null);

    const baseColor = useThemeColor(color);

    const variables = {
        "--bg-color": baseColor,
        "--border-color": baseColor,
        "--border-secondary-color": `${chroma.valid(baseColor) ? chroma(baseColor).darken(0.5) : baseColor}`,
    } as React.CSSProperties;

    return (
        <CSSTransition
            timeout={300}
            classNames={{
                enter: styles["enter"],
                enterActive: styles["enter-active"],
                exit: styles["exit"],
                exitActive: styles["exit-active"],
            }}
            nodeRef={nodeRef}
        >
            <div
                {...rest}
                className={styles["root"]}
                style={variables}
                ref={nodeRef}
            >
                <div className={styles["icon"]}>{icon}</div>
                <div className={styles["content-wrapper"]}>
                    <h2 className={styles["title"]}>{title}</h2>
                    <p className={styles["description"]}>{description}</p>
                </div>
            </div>
        </CSSTransition>
    );
}
