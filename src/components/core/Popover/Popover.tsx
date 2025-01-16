import { useEffect, useRef, useState } from "react";
import styles from "./Popover.module.scss";
import clsx from "clsx";
import { Popover as ArkPopover, Portal } from "@ark-ui/react";
import { nanoid } from "nanoid";

export interface PopoverProps {
    children: React.ReactElement;
    content: React.ReactElement;
    placement?: "top" | "right" | "bottom" | "left";
    controlled?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    offset?: {
        mainAxis?: number;
        crossAxis?: number;
    };
    className?: string;
    style?: React.CSSProperties;
}

export function Popover(props: PopoverProps) {
    const {
        children,
        content,
        placement = "bottom",
        controlled = false,
        open = false,
        onOpenChange,
        offset = {
            mainAxis: 20,
            crossAxis: 8,
        },
        className,
        style,
    } = props;

    const [uncontrolledOpen, setUncontrolledOpen] = useState(open);

    function handleOpenChange(open: boolean) {
        if (controlled) {
            onOpenChange?.(open);
        } else {
            setUncontrolledOpen(open);
        }
    }

    const portal = useRef<HTMLElement | null>(
        document.getElementById("portals")
    );

    return (
        <ArkPopover.Root
            portalled
            autoFocus={false}
            positioning={{
                placement: placement,
                offset: offset,
            }}
            open={controlled ? open : uncontrolledOpen}
            closeOnInteractOutside={false}
            onPointerDownOutside={(_) => {
                handleOpenChange(false);
            }}
            onOpenChange={(v) => {
                handleOpenChange(v.open);
            }}
            lazyMount
        >
            <ArkPopover.Trigger asChild>{children}</ArkPopover.Trigger>
            <Portal container={portal}>
                <ArkPopover.Positioner className={styles["positioner"]}>
                    <ArkPopover.Content
                        className={clsx(styles["content"], className)}
                        style={style}
                    >
                        {content}
                    </ArkPopover.Content>
                </ArkPopover.Positioner>
            </Portal>
        </ArkPopover.Root>
    );
}
