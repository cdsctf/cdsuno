import useThemeColor from "@/hooks/useThemeColor";
import styles from "./Switch.module.scss";
import { CSSProperties } from "react";
import { Box } from "../Box";

export interface SwitchProps {
    checked: boolean;
    color?: string;
    onChange: (value: boolean) => void;
    label?: string;
}

export function Switch(props: SwitchProps) {
    const { checked, color = "primary", onChange, label } = props;

    const baseColor = useThemeColor(color);

    const variables = {
        "--switch-bg-color": baseColor,
    } as CSSProperties;

    return (
        <Box className={styles["root"]} style={variables}>
            <Box
                className={styles["switch"]}
                data-checked={checked}
                onClick={() => onChange(!checked)}
            >
                <Box className={styles["handle"]}></Box>
            </Box>
            <Box className={styles["label"]}>{label}</Box>
        </Box>
    );
}
