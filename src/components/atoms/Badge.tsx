import useThemeColor from "@/hooks/useThemeColor";
import styles from "@/styles/components/atoms/Badge.module.scss";
import { getTextColor } from "@/utils/color";
import chroma from "chroma-js";
import { CSSProperties, useMemo } from "react";

export interface BadgeProps {
    variant?: "solid" | "light" | "outline";
    color?: string;
    children: React.ReactNode;
}

export default function Badge(props: BadgeProps) {
    const { variant = "solid", color = "primary", children } = props;

    const baseColor = useThemeColor(color);

    const bgColor = () => {
        switch (variant) {
            case "solid":
                return baseColor;
            case "light":
            case "outline":
                return chroma(baseColor).alpha(0.5).hex();
        }
    };

    const borderColor = () => {
        switch (variant) {
            case "solid":
            case "light":
                return "transparent";
            case "outline":
                return baseColor;
        }
    };

    const textColor = () => {
        return getTextColor(chroma(bgColor()), chroma(baseColor));
    };

    const variables = {
        "--bg-color": bgColor(),
        "--border-color": borderColor(),
        "--text-color": textColor(),
    } as CSSProperties;

    return (
        <div className={styles["root"]} style={variables}>
            <div className={styles["content"]}>{children}</div>
        </div>
    );
}
