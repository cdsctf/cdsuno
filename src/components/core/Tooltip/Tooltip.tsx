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
        children,
        className,
        style,
        ...rest
    } = props;

    const triggerRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const isHovered = useHover(triggerRef);

    const [tooltipStyle, setTooltipStyle] = useState<CSSProperties>({});

    useEffect(() => {
        if (!isHovered || !triggerRef.current || !contentRef.current) return;

        console.log("triggerRef.current");
        console.log(triggerRef?.current?.getBoundingClientRect().top);

        const newStyle: CSSProperties = {};

        const triggerRect = triggerRef?.current?.getBoundingClientRect();
        const contentRect = contentRef?.current?.getBoundingClientRect();

        switch (position) {
            case "top":
                newStyle.top =
                    triggerRect?.top! - contentRect?.height! - offset;
                newStyle.left =
                    triggerRect?.left! +
                    (triggerRect?.width! - contentRect?.width!) / 2;
                break;
            case "bottom":
                newStyle.top = triggerRect?.bottom! + offset;
                newStyle.left =
                    triggerRect?.left! +
                    (triggerRect?.width! - contentRect?.width!) / 2;
                break;
            case "left":
                newStyle.top =
                    triggerRect?.top! +
                    (triggerRect?.height! - contentRect?.height!) / 2;
                newStyle.left =
                    triggerRect?.left! - contentRect?.width! - offset;
                break;
            case "right":
                newStyle.top =
                    triggerRect?.top! +
                    (triggerRect?.height! - contentRect?.height!) / 2;
                newStyle.left = triggerRect?.right! + offset;
                break;
        }

        newStyle.position = "fixed";
        setTooltipStyle(newStyle);
    }, [
        isHovered,
        position,
        offset,
        triggerRef?.current?.getBoundingClientRect().top,
        triggerRef?.current?.getBoundingClientRect().left,
    ]);

    return (
        <>
            {cloneElement<any>(children, {
                ref: triggerRef,
            })}
            {createPortal(
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
                        className={styles["content"]}
                        style={tooltipStyle}
                        ref={contentRef}
                    >
                        {content}
                    </Box>
                </CSSTransition>,
                document.body
            )}
        </>
    );
}
