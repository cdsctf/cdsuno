import { cloneElement, useEffect, useRef, useState } from "react";
import styles from "./Popover.module.scss";
import { CSSTransition } from "react-transition-group";
import { Box } from "../Box";
import clsx from "clsx";
import { useSharedStore } from "@/stores/shared";
import { Popover as ArkPopover, Portal } from "@ark-ui/react";
import { createPortal } from "react-dom";

export interface PopoverProps {
    children: React.ReactElement;
    content: React.ReactElement;
    placement?: "top" | "right" | "bottom" | "left";
    className?: string;
    style?: React.CSSProperties;
}

export function Popover(props: PopoverProps) {
    const { children, content, placement = "bottom", className, style } = props;

    const [isOpen, setIsOpen] = useState(false);

    return (
        <ArkPopover.Root
            positioning={{
                placement: placement,
                offset: {
                    mainAxis: 20,
                    crossAxis: 8,
                },
            }}
            open={isOpen}
            onOpenChange={(v) => setIsOpen(v.open)}
        >
            <ArkPopover.Trigger onClick={() => setIsOpen(true)}>
                {children}
            </ArkPopover.Trigger>
            <Portal>
                <ArkPopover.Positioner>
                    <ArkPopover.Content
                        className={clsx(styles["root"], className)}
                    >
                        {content}
                    </ArkPopover.Content>
                </ArkPopover.Positioner>
            </Portal>
        </ArkPopover.Root>
    );
}
