import { Toast } from "@/components/core/Toast";
import { useToastStore } from "@/stores/toast";
import styles from "@/styles/components/Toaster.module.scss";
import React, { useEffect, useRef, useState } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

export default function Toaster() {
    const toastStore = useToastStore();
    const nodeRefs = useRef(new Map());
    const [visibleToasts, setVisibleToasts] = useState(new Set());

    useEffect(() => {
        toastStore.toasts.forEach((toast) => {
            if (!visibleToasts.has(toast.id)) {
                setVisibleToasts((prev) => new Set(prev).add(toast.id));

                const timer = setTimeout(() => {
                    setVisibleToasts((prev) => {
                        const newSet = new Set(prev);
                        newSet.delete(toast.id);
                        return newSet;
                    });
                    toastStore.removeToast(toast.id);
                    nodeRefs.current.delete(toast.id);
                }, toast.duration || 3000);

                return () => clearTimeout(timer);
            }
        });
    }, [toastStore.toasts]);

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
                                    title={`你好 ${toast.id}`}
                                    description={"ciallo~"}
                                />
                            </div>
                        </CSSTransition>
                    );
                })}
            </TransitionGroup>
        </div>
    );
}
