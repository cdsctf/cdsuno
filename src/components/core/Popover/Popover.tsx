import { cloneElement, useEffect, useRef, useState } from "react";
import styles from "./Popover.module.scss";
import { CSSTransition } from "react-transition-group";
import { Box } from "../Box";
import clsx from "clsx";
import { useSharedStore } from "@/stores/shared";
import { createPortal } from "react-dom";

export interface PopoverProps {
    children: React.ReactElement;
    offsetY?: number;
    offsetX?: number;
    content: React.ReactElement;
    opened: boolean;
    onChange: (opened: boolean) => void;
    className?: string;
    style?: React.CSSProperties;
    portal?: HTMLDivElement | null;
}

export function Popover(props: PopoverProps) {
    const sharedStore = useSharedStore();

    const {
        children,
        offsetY = 10,
        offsetX = 0,
        content,
        opened,
        onChange,
        className,
        style,
        portal = sharedStore?.portal,
    } = props;

    const contentRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLElement>(null);

    const [popoverStyle, setPopoverStyle] = useState<React.CSSProperties>({});

    useEffect(() => {
        if (
            !sharedStore?.portal ||
            !triggerRef.current ||
            !contentRef.current ||
            !opened
        )
            return;

        const portalRect = portal?.getBoundingClientRect()!;
        const triggerRect = triggerRef.current.getBoundingClientRect();
        const contentRect = contentRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;

        let newStyle: React.CSSProperties = {};

        // Calculate vertical position
        if (
            viewportHeight - triggerRect.bottom >=
            contentRect.height + offsetY
        ) {
            newStyle.top = `${triggerRect.bottom - portalRect.top + offsetY}px`;
        } else if (triggerRect.top >= contentRect.height + offsetY) {
            newStyle.top = `${triggerRect.top - portalRect.top - contentRect.height - offsetY}px`;
        } else {
            newStyle.top = `${Math.max(triggerRect.top - portalRect.top, 0)}px`;
        }

        // Calculate horizontal position
        if (viewportWidth - triggerRect.left >= contentRect.width + offsetX) {
            newStyle.left = `${triggerRect.left - portalRect.left + offsetX}px`;
        } else if (triggerRect.right >= contentRect.width + offsetX) {
            newStyle.left = `${triggerRect.right - portalRect.left - contentRect.width - offsetX}px`;
        } else {
            newStyle.left = `${Math.max(triggerRect.left - portalRect.left, 0)}px`;
        }

        setPopoverStyle(newStyle);
    }, [opened, offsetY, offsetX]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                contentRef.current &&
                !contentRef.current.contains(event.target as Node) &&
                triggerRef &&
                !triggerRef.current?.contains(event.target as Node)
            ) {
                onChange(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            {cloneElement<any>(children, { ref: triggerRef })}
            {sharedStore?.portal &&
                createPortal(
                    <CSSTransition
                        in={opened}
                        timeout={300}
                        unmountOnExit
                        nodeRef={contentRef}
                        classNames={{
                            enter: styles["enter"],
                            enterActive: styles["enter-active"],
                            exit: styles["exit"],
                            exitActive: styles["exit-active"],
                        }}
                    >
                        <Box
                            className={clsx(styles["root"], className)}
                            style={{ ...style, ...popoverStyle }}
                            ref={contentRef}
                        >
                            {content}
                        </Box>
                    </CSSTransition>,
                    sharedStore?.portal
                )}
        </>
    );
}
