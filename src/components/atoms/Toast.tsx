import InfoCircleBold from "~icons/solar/info-circle-bold";
import styles from "@/styles/components/atoms/Toast.module.scss";
import useThemeColor from "@/hooks/useThemeColor";
import { CSSTransition } from "react-transition-group";
import chroma from "chroma-js";
import { ComponentProps, useEffect, useRef, useState } from "react";

export interface ToastProps extends ComponentProps<"div"> {
    id?: string;
    title?: string;
    description?: string;
    duration?: number;
    color?: string;
    icon?: React.ReactNode;
    type?: string;
    onClose: () => void;
}

export default function Toast(props: ToastProps) {
    const {
        id,
        title,
        description,
        color = "primary",
        icon = <InfoCircleBold />,
        duration = 2000,
        onClose,
        type,
        ...rest
    } = props;

    const nodeRef = useRef(null);
    const [show, setShow] = useState(true);

    const baseColor = useThemeColor(color);

    const variables = {
        "--bg-color": baseColor,
        "--border-color": baseColor,
        "--border-secondary-color": `${chroma.valid(baseColor) ? chroma(baseColor).darken(0.5) : baseColor}`,
    } as React.CSSProperties;

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
        }, duration);
        return () => clearTimeout(timer);
    }, []);

    return (
        <CSSTransition
            in={show}
            timeout={300}
            classNames={{
                enter: styles["enter"],
                enterActive: styles["enter-active"],
                exit: styles["exit"],
                exitActive: styles["exit-active"],
            }}
            unmountOnExit
            nodeRef={nodeRef}
            onExited={() => onClose()}
        >
            <div
                className={styles["root"]}
                style={variables}
                ref={nodeRef}
                {...rest}
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
