import * as React from "react";
import * as RadixDialog from "@radix-ui/react-dialog";

import { cn } from "@/utils";

interface DialogProps
    extends React.ComponentProps<typeof RadixDialog.Root>,
        React.ComponentProps<typeof RadixDialog.Content> {
    title?: string;
}

function Dialog(props: DialogProps) {
    const { title, open, onOpenChange, className, children, ref, ...rest } =
        props;

    return (
        <RadixDialog.Root
            data-slot="dialog"
            open={open}
            onOpenChange={onOpenChange}
        >
            <RadixDialog.DialogTitle className={cn(["hidden"])}>
                {title}
            </RadixDialog.DialogTitle>
            <DialogPortal data-slot="dialog-portal">
                <DialogOverlay />
                <RadixDialog.Content
                    title={title}
                    data-slot="dialog-content"
                    className={cn(
                        [
                            "data-[state=open]:animate-in",
                            "data-[state=closed]:animate-out",
                            "data-[state=closed]:fade-out-0",
                            "data-[state=open]:fade-in-0",
                            "data-[state=closed]:zoom-out-95",
                            "data-[state=open]:zoom-in-95",
                            "outline-hidden",
                            "fixed",
                            "top-1/2",
                            "left-1/2",
                            "z-50",
                            "grid",
                            "-translate-x-1/2",
                            "-translate-y-1/2",
                            "duration-200",
                        ],
                        className
                    )}
                    ref={ref}
                    {...rest}
                >
                    <RadixDialog.Description />
                    {children}
                </RadixDialog.Content>
            </DialogPortal>
        </RadixDialog.Root>
    );
}

function DialogPortal({
    ...props
}: React.ComponentProps<typeof RadixDialog.Portal>) {
    return <RadixDialog.Portal data-slot="dialog-portal" {...props} />;
}

function DialogOverlay({
    className,
    ...props
}: React.ComponentProps<typeof RadixDialog.Overlay>) {
    return (
        <RadixDialog.Overlay
            data-slot="dialog-overlay"
            className={cn(
                [
                    "data-[state=open]:animate-in",
                    "data-[state=closed]:animate-out",
                    "data-[state=closed]:fade-out-0",
                    "data-[state=open]:fade-in-0",
                    "fixed",
                    "inset-0",
                    "z-50",
                    "bg-black/80",
                ],
                className
            )}
            {...props}
        />
    );
}

export { Dialog, DialogOverlay, DialogPortal };
