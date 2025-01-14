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
import { useSharedStore } from "@/stores/shared";
import { Tooltip as ArkTooltip, useTooltip } from "@ark-ui/react";

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

    return (
        <ArkTooltip.Root>
            <ArkTooltip.Trigger asChild>{children}</ArkTooltip.Trigger>
            <ArkTooltip.Positioner>
                <ArkTooltip.Content className={styles["root"]}>
                    {content}
                </ArkTooltip.Content>
            </ArkTooltip.Positioner>
        </ArkTooltip.Root>
    );
}
