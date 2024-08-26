import {
    Dialog as ArkDialog,
    DialogOpenChangeDetails,
    Portal,
} from "@ark-ui/react";
import { CSSTransition } from "react-transition-group";
import styles from "@/styles/components/atoms/Dialog.module.scss";
import { useEffect, useRef, useState } from "react";

export interface DialogProps extends ArkDialog.RootProps {
    open: boolean;
    onOpenChange: (details: DialogOpenChangeDetails) => void;
}

export default function Dialog(props: DialogProps) {
    const { children, open, onOpenChange } = props;
    const nodeRef = useRef(null);

    const [innerOpen, setInnerOpen] = useState<boolean>(open);

    useEffect(() => {
        if (open) {
            setInnerOpen(open);
        }
    }, [open]);

    const handleExited = () => {
        setInnerOpen(false);
    };

    return (
        <ArkDialog.Root
            open={innerOpen}
            onOpenChange={(details) => {
                if (!details.open) {
                    onOpenChange({ open: false });
                }
            }}
            lazyMount
            unmountOnExit
            role="dialog"
        >
            <Portal>
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
                    onExited={handleExited}
                    nodeRef={nodeRef}
                >
                    <div className={styles.dialog} ref={nodeRef}>
                        <ArkDialog.Positioner className={styles.positioner}>
                            <ArkDialog.Content className={styles.content}>
                                {children}
                            </ArkDialog.Content>
                        </ArkDialog.Positioner>
                        <ArkDialog.Backdrop className={styles.backdrop} />
                    </div>
                </CSSTransition>
            </Portal>
        </ArkDialog.Root>
    );
}
