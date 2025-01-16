import styles from "./Dialog.module.scss";
import React, { ComponentProps, useEffect, useRef } from "react";
import { Dialog as ArkDialog, Portal } from "@ark-ui/react";
import { nanoid } from "nanoid";

export interface DialogProps extends ComponentProps<"dialog"> {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export function Dialog(props: DialogProps) {
    const { children, open, onClose } = props;
    const portal = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const ctn = document.createElement("div");
        ctn.id = `dialog-portal-${nanoid()}`;
        document.getElementById("portals")!.appendChild(ctn);
        portal.current = ctn;

        return () => {
            if (portal.current) {
                document.getElementById("portals")!.removeChild(portal.current);
                portal.current = null;
            }
        };
    }, []);

    if (!portal.current) {
        return;
    }

    return (
        <ArkDialog.Root open={open} onOpenChange={(details) => onClose()}>
            <Portal container={portal}>
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
