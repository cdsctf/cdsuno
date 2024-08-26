import Toast from "@/components/atoms/Toast";
import { useToastStore } from "@/stores/toast";
import styles from "@/styles/components/Toaster.module.scss";
import { TransitionGroup } from "react-transition-group";

export default function Toaster() {
    const toastStore = useToastStore();

    return (
        <TransitionGroup className={styles["root"]}>
            {toastStore.toasts.map((toast) => (
                <Toast
                    key={toast.id}
                    title={`你好 ${toast.id}`}
                    description={"ciallo~"}
                />
            ))}
        </TransitionGroup>
    );
}
