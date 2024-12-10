import useHover from "@/hooks/useHover";
import styles from "./Tooltip.module.scss";
import { cloneElement, CSSProperties, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { Box } from "../Box";

export interface TooltipProps {
    content?: React.ReactNode;
    position?: "top" | "right" | "bottom" | "left";
    offset?: number;
    hasArrow?: boolean;
    children: React.ReactElement;
}

export function Tooltip(props: TooltipProps) {
    const { content, position = "top", offset = 8, children } = props;

    const triggerRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const isHovered = useHover(triggerRef);

    const variables = {
        "--tooltip-offset": `${offset}px`,
    } as CSSProperties;

    return (
        <Box className={styles["root"]} style={variables}>
            {cloneElement<any>(children, {
                ref: triggerRef,
            })}
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
                    data-position={position}
                    ref={contentRef}
                >
                    {content}
                </Box>
            </CSSTransition>
        </Box>
    );
}
