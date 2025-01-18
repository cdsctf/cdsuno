import "./Dialog.scss";
import React, { ComponentProps, useRef } from "react";
import { Dialog as ArkDialog, Portal } from "@ark-ui/react";

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
            onOpenChange={(details) => onClose()}
            lazyMount
            unmountOnExit
        >
            <Portal container={portal}>
                <ArkDialog.Backdrop className={"dialog-backdrop"} />
                <ArkDialog.Positioner className={"dialog-positioner"}>
                    <ArkDialog.Content className={"dialog-content"}>
                        {children}
                    </ArkDialog.Content>
                </ArkDialog.Positioner>
            </Portal>
        </ArkDialog.Root>
    );
}
