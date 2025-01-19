import React, { ComponentProps, useRef } from "react";
import { Dialog as ArkDialog, Portal } from "@ark-ui/react";
import styles from "./Dialog.module.scss";

export interface DialogProps extends ComponentProps<"dialog"> {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export function Dialog(props: DialogProps) {
    const { children, open, onClose } = props;
    const portal = useRef<HTMLElement | null>(
        document.getElementById("portals")
    );

    return (
        <ArkDialog.Root
            open={open}
            onOpenChange={(_) => onClose()}
            lazyMount
            unmountOnExit
        >
            <Portal container={portal}>
                <ArkDialog.Backdrop className={styles["dialog-backdrop"]} />
                <ArkDialog.Positioner className={styles["dialog-positioner"]}>
                    <ArkDialog.Content className={styles["dialog-content"]}>
                        {children}
                    </ArkDialog.Content>
                </ArkDialog.Positioner>
            </Portal>
        </ArkDialog.Root>
    );
}
