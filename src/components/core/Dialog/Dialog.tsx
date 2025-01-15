import styles from "./Dialog.module.scss";
import React, { ComponentProps } from "react";
import { Dialog as ArkDialog, Portal } from "@ark-ui/react";

export interface DialogProps extends ComponentProps<"dialog"> {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export function Dialog(props: DialogProps) {
    const { children, open, onClose } = props;

    return (
        <ArkDialog.Root open={open} onOpenChange={(details) => onClose()}>
            <Portal>
                <ArkDialog.Backdrop className={styles["backdrop"]} />
                <ArkDialog.Positioner className={styles["positioner"]}>
                    <ArkDialog.Content className={styles["content"]}>
                        {children}
                    </ArkDialog.Content>
                </ArkDialog.Positioner>
            </Portal>
        </ArkDialog.Root>
    );
}
