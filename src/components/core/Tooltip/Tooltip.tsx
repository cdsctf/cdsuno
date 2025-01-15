import styles from "./Tooltip.module.scss";
import { Tooltip as ArkTooltip, Portal } from "@ark-ui/react";
import { useRef } from "react";

export interface TooltipProps {
    content?: React.ReactNode;
    placement?: "top" | "right" | "bottom" | "left";
    offset?: {
        mainAxis?: number;
        crossAxis?: number;
    };
    hasArrow?: boolean;
    children: React.ReactElement;
}

export function Tooltip(props: TooltipProps) {
    const {
        content,
        placement = "top",
        offset = {
            mainAxis: 0,
            crossAxis: 0,
        },
        hasArrow = false,
        children,
    } = props;

    const portal = useRef<HTMLElement | null>(
        document.getElementById("tooltip-portal")!
    );

    return (
        <ArkTooltip.Root
            closeDelay={100}
            openDelay={100}
            positioning={{
                placement: placement,
                offset: offset,
            }}
        >
            <ArkTooltip.Trigger asChild>{children}</ArkTooltip.Trigger>
            <Portal container={portal}>
                <ArkTooltip.Positioner className={styles["positioner"]}>
                    <ArkTooltip.Content className={styles["content"]}>
                        {hasArrow && (
                            <ArkTooltip.Arrow>
                                <ArkTooltip.ArrowTip />
                            </ArkTooltip.Arrow>
                        )}
                        {content}
                    </ArkTooltip.Content>
                </ArkTooltip.Positioner>
            </Portal>
        </ArkTooltip.Root>
    );
}
