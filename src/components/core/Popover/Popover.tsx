import { useRef, useState } from "react";
import styles from "./Popover.module.scss";
import clsx from "clsx";
import { Popover as ArkPopover, Portal } from "@ark-ui/react";

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

    const portal = useRef<HTMLElement | null>(
        document.getElementById("popover-portal")!
    );

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
            <ArkPopover.Trigger onClick={() => setIsOpen(true)} asChild>
                {children}
            </ArkPopover.Trigger>
            <Portal container={portal}>
                <ArkPopover.Positioner className={styles["positioner"]}>
                    <ArkPopover.Content
                        className={clsx(styles["content"], className)}
                    >
                        {content}
                    </ArkPopover.Content>
                </ArkPopover.Positioner>
            </Portal>
        </ArkPopover.Root>
    );
}
