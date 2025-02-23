import * as React from "react";
import * as RadixDialog from "@radix-ui/react-dialog";

import { cn } from "@/utils";

interface DialogProps
    extends React.ComponentProps<typeof RadixDialog.Root>,
        React.ComponentProps<typeof RadixDialog.Content> {}

function Dialog(props: DialogProps) {
    const { open, onOpenChange, className, children, ref, ...rest } = props;

    return (
        <RadixDialog.Root
            data-slot="dialog"
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogPortal data-slot="dialog-portal">
                <DialogOverlay />
                <RadixDialog.Content
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
                            "top-[50%]",
                            "left-[50%]",
                            "z-50",
                            "grid",
                            "w-full",
                            "translate-x-[-50%]",
                            "translate-y-[-50%]",
                            "duration-200",
                            "sm:max-w-lg",
                        ],
                        className
                    )}
                    ref={ref}
                    {...rest}
                >
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
