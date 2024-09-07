import styles from "@/styles/components/atoms/Dropdown.module.scss";
import { ComponentProps, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";

export interface DropdownProps extends ComponentProps<"div"> {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export default function Dropdown(props: DropdownProps) {
    const { open, onClose, children } = props;

    const nodeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                nodeRef.current &&
                !nodeRef.current.contains(event.target as Node)
            ) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <CSSTransition
            in={open}
            timeout={300}
            nodeRef={nodeRef}
            unmountOnExit
            classNames={{
                enter: styles["enter"],
                enterActive: styles["enter-active"],
                exit: styles["exit"],
                exitActive: styles["exit-active"],
            }}
        >
            <div ref={nodeRef} className={styles["root"]}>
                {children}
            </div>
        </CSSTransition>
    );
}
