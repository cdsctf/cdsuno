import { CSSTransition } from "react-transition-group";
import styles from "@/styles/components/atoms/Dialog.module.scss";
import React, { ComponentProps, useRef } from "react";

export interface DialogProps extends ComponentProps<"dialog"> {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export default function Dialog(props: DialogProps) {
    const { children, open, onClose } = props;
    const nodeRef = useRef(null);

    const handleOverlayClick = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <CSSTransition
            in={open}
            timeout={300}
            unmountOnExit
            classNames={{
                enter: styles["enter"],
                enterActive: styles["enter-active"],
                exit: styles["exit"],
                exitActive: styles["exit-active"],
            }}
            nodeRef={nodeRef}
        >
            <div
                className={styles["root"]}
                ref={nodeRef}
                onClick={handleOverlayClick}
            >
                <div className={styles["positioner"]}>
                    <div className={styles["content"]}>{children}</div>
                </div>
            </div>
        </CSSTransition>
    );
}
