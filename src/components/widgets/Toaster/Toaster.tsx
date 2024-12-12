import { Toast } from "@/components/core/Toast";
import { useToastStore } from "@/stores/toast";
import styles from "./Toaster.module.scss";
import React, { useEffect, useRef, useState } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import InfoCircleBold from "~icons/solar/info-circle-bold";
import CheckCircleBold from "~icons/solar/check-circle-bold";
import DangerCircleBold from "~icons/solar/danger-circle-bold";
import CloseCircleBold from "~icons/solar/close-circle-bold";

export function Toaster() {
    const toastStore = useToastStore();
    const nodeRefs = useRef(new Map());

    function getIcon(type: string) {
        switch (type) {
            case "info":
                return <InfoCircleBold />;
            case "success":
                return <CheckCircleBold />;
            case "warning":
                return <DangerCircleBold />;
            case "error":
                return <CloseCircleBold />;
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            const timestamp = Date.now();
            toastStore?.toasts.forEach((toast) => {
                if (Number(toast?.removedAt) < timestamp) {
                    toastStore.remove(toast.id);
                }
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [toastStore?.toasts]);

    return (
        <div className={styles["root"]}>
            <TransitionGroup className={styles["toast-wrapper"]}>
                {toastStore.toasts.map((toast) => {
                    if (!nodeRefs.current.has(toast.id)) {
                        nodeRefs.current.set(toast.id, React.createRef());
                    }
                    const nodeRef = nodeRefs.current.get(toast.id);

                    return (
                        <CSSTransition
                            nodeRef={nodeRef}
                            key={toast.id}
                            timeout={300}
                            classNames={{
                                enter: styles["enter"],
                                enterActive: styles["enter-active"],
                                exit: styles["exit"],
                                exitActive: styles["exit-active"],
                            }}
                            unmountOnExit
                        >
                            <div ref={nodeRef} className={styles["toast"]}>
                                <Toast
                                    title={toast?.title}
                                    description={toast?.description}
                                    icon={toast?.icon || getIcon(toast?.type)}
                                    color={toast?.type}
                                />
                            </div>
                        </CSSTransition>
                    );
                })}
            </TransitionGroup>
        </div>
    );
}
