import styles from "./Tooltip.module.scss";
import { CSSProperties } from "react";

export interface TooltipProps {
    content?: React.ReactNode;
    position?: "top" | "right" | "bottom" | "left";
    offset?: number;
    hasArrow?: boolean;
    children: React.ReactNode;
}

export function Tooltip(props: TooltipProps) {
    const { content, position = "top", offset = 8, children } = props;

    const variables = {
        "--tooltip-offset": `${offset}px`,
    } as CSSProperties;

    return (
        <div className={styles["root"]} style={variables}>
            <div className={styles["trigger"]}>{children}</div>
            <div className={styles["content"]} data-position={position}>
                {content}
            </div>
        </div>
    );
}
