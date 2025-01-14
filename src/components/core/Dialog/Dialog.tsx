import { CSSTransition } from "react-transition-group";
import styles from "./Dialog.module.scss";
import React, { ComponentProps, useRef } from "react";
import { Box } from "../Box";
import { createPortal } from "react-dom";
import { useSharedStore } from "@/stores/shared";

export interface DialogProps extends ComponentProps<"dialog"> {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export function Dialog(props: DialogProps) {
    const { children, open, onClose } = props;

    const sharedStore = useSharedStore();

    const nodeRef = useRef(null);

    const handleOverlayClick = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <>
            {sharedStore?.portal &&
                createPortal(
                    <CSSTransition
                        in={open}
                        timeout={150}
                        unmountOnExit
                        classNames={{
                            enter: styles["enter"],
                            enterActive: styles["enter-active"],
                            exit: styles["exit"],
                            exitActive: styles["exit-active"],
                        }}
                        nodeRef={nodeRef}
                    >
                        <Box
                            className={styles["root"]}
                            ref={nodeRef}
                            onClick={handleOverlayClick}
                        >
                            <Box className={styles["positioner"]}>
                                <Box className={styles["content"]}>
                                    {children}
                                </Box>
                            </Box>
                        </Box>
                    </CSSTransition>,
                    sharedStore?.portal
                )}
        </>
    );
}
