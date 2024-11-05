import { cloneElement, useEffect, useMemo, useRef, useState } from "react";
import styles from "./Popover.module.scss";
import { CSSTransition } from "react-transition-group";

export interface PopoverProps {
    /**
     * The content of the popover.
     */
    children: React.ReactElement;
    /**
     * The offset of the popover.
     */
    offsetY?: number;
    /**
     * The offset of the popover.
     */
    offsetX?: number;
    /**
     * The trigger of the popover.
     */
    content: React.ReactElement;
    /**
     * Whether the popover is opened or not.
     */
    opened: boolean;
    /**
     * The callback function when the popover is opened.
     */
    onChange: (opened: boolean) => void;
}

export function Popover(props: PopoverProps) {
    const {
        children,
        offsetY = 10,
        offsetX = 0,
        content,
        opened,
        onChange,
    } = props;

    const contentRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLElement>(null);

    const [position, setPosition] = useState<"top" | "bottom">("bottom");

    useEffect(() => {
        if (triggerRef.current && opened) {
            const triggerRect = triggerRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            const spaceBelow = viewportHeight - triggerRect.bottom - offsetY;
            const spaceAbove = triggerRect.top - offsetY;

            if (
                spaceBelow < (contentRef?.current?.offsetHeight || 0) &&
                spaceAbove > (contentRef?.current?.offsetHeight || 0)
            ) {
                setPosition("top");
            } else {
                setPosition("bottom");
            }
        }
    }, [opened, offsetY]);

    const positionStyle = useMemo(() => {
        switch (position) {
            case "top":
                return {
                    bottom: `calc(100% + ${offsetY}px)`,
                    right: `${offsetX}px`,
                };
            case "bottom":
            default:
                return {
                    top: `calc(100% + ${offsetY}px)`,
                    right: `${offsetX}px`,
                };
        }
    }, [position, offsetY, offsetX]);

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
        <div className={styles["root"]}>
            {cloneElement(children, { ref: triggerRef })}
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
                <div
                    className={styles["content"]}
                    style={positionStyle}
                    ref={contentRef}
                >
                    {content}
                </div>
            </CSSTransition>
        </div>
    );
}
