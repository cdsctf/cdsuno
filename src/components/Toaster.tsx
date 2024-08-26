import Toast from "@/components/atoms/Toast";
import { useToastStore } from "@/stores/toast";
import styles from "@/styles/components/Toaster.module.scss";
import { useEffect } from "react";
import { TransitionGroup } from "react-transition-group";

export default function Toaster() {
    const toastStore = useToastStore();

    useEffect(() => {
        console.log(toastStore.toasts);
    }, [toastStore.toasts]);

    return (
        <div className={styles["root"]}>
            <TransitionGroup className={styles["toast-wrapper"]}>
                {toastStore.toasts.map((toast) => (
                    <Toast
                        key={toast.id}
                        title={`你好 ${toast.id}`}
                        description={"ciallo~"}
                        duration={toast.duraton}
                        onClose={() => toastStore.removeToast(toast.id)}
                    />
                ))}
            </TransitionGroup>
        </div>
    );
}
