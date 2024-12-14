import useHover from "@/hooks/useHover";
import styles from "./Tooltip.module.scss";
import {
    cloneElement,
    CSSProperties,
    useRef,
    useState,
    useEffect,
} from "react";
import { CSSTransition } from "react-transition-group";
import { Box, BoxProps } from "../Box";
import clsx from "clsx";
import { createPortal } from "react-dom";
import { useTooltipStore } from "@/stores/tooltip";

export interface TooltipProps extends Omit<BoxProps, "content"> {
    content?: React.ReactNode;
    position?: "top" | "right" | "bottom" | "left";
    offset?: number;
    hasArrow?: boolean;
    children: React.ReactElement;
}

export function Tooltip(props: TooltipProps) {
    const {
        content,
        position = "top",
        offset = 8,
        hasArrow = false,
        children,
        className,
        style,
        ...rest
    } = props;

    const tooltipStore = useTooltipStore();
    const triggerRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const isHovered = useHover(triggerRef);

    const [tooltipStyle, setTooltipStyle] = useState<CSSProperties>({});

    useEffect(() => {
        if (
            !isHovered ||
            !triggerRef.current ||
            !contentRef.current ||
            !tooltipStore?.portal
        )
            return;

        const triggerRect = triggerRef.current.getBoundingClientRect();
        const contentRect = contentRef.current.getBoundingClientRect();
        const portalRect = tooltipStore.portal.getBoundingClientRect();

        const newStyle: CSSProperties = {};

        switch (position) {
            case "top":
                newStyle.top =
                    triggerRect.top -
                    portalRect.top -
                    contentRect.height -
                    offset;
                newStyle.left =
                    triggerRect.left -
                    portalRect.left +
                    (triggerRect.width - contentRect.width) / 2;
                break;
            case "right":
                newStyle.top =
                    triggerRect.top -
                    portalRect.top +
                    (triggerRect.height - contentRect.height) / 2;
                newStyle.left = triggerRect.right - portalRect.left + offset;
                break;
            case "bottom":
                newStyle.top = triggerRect.bottom - portalRect.top + offset;
                newStyle.left =
                    triggerRect.left -
                    portalRect.left +
                    (triggerRect.width - contentRect.width) / 2;
                break;
            case "left":
                newStyle.top =
                    triggerRect.top -
                    portalRect.top +
                    (triggerRect.height - contentRect.height) / 2;
                newStyle.left =
                    triggerRect.left -
                    portalRect.left -
                    contentRect.width -
                    offset;
                break;
            default:
                break;
        }

        newStyle.top = Math.max(0, Number(newStyle.top) || 0);
        newStyle.left = Math.max(0, Number(newStyle.left) || 0);

        setTooltipStyle(newStyle);
    }, [isHovered, position, offset, tooltipStore?.portal]);

    return (
        <>
            {cloneElement<any>(children, {
                ref: triggerRef,
            })}
            {tooltipStore?.portal &&
                createPortal(
                    <CSSTransition
                        in={isHovered}
                        unmountOnExit
                        timeout={300}
                        nodeRef={contentRef}
                        classNames={{
                            enter: styles["enter"],
                            enterActive: styles["enter-active"],
                            exit: styles["exit"],
                            exitActive: styles["exit-active"],
                        }}
                    >
                        <Box
                            className={clsx(styles["root"], className, {
                                [styles["has-arrow"]]: hasArrow,
                            })}
                            style={{
                                ...style,
                                ...tooltipStyle,
                            }}
                            data-position={position}
                            data-arrow={hasArrow}
                            ref={contentRef}
                            {...rest}
                        >
                            {content}
                            {hasArrow && (
                                <div
                                    className={clsx(
                                        styles["arrow"],
                                        styles[`arrow-${position}`]
                                    )}
                                    style={{
                                        position: "absolute",
                                    }}
                                />
                            )}
                        </Box>
                    </CSSTransition>,
                    tooltipStore?.portal
                )}
        </>
    );
}
