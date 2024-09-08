import useThemeColor from "@/hooks/useThemeColor";
import styles from "@/styles/components/atoms/Switch.module.scss";
import { CSSProperties } from "react";

export interface SwitchProps {
    checked: boolean;
    color?: string;
    onChange: (value: boolean) => void;
    label?: string;
}

export default function Switch(props: SwitchProps) {
    const { checked, color = "primary", onChange, label } = props;

    const baseColor = useThemeColor(color);

    const variables = {
        "--bg-color": baseColor,
    } as CSSProperties;

    return (
        <div className={styles["root"]}>
            <div
                className={`${styles["switch"]} ${checked ? styles["checked"] : ""}`}
                style={variables}
                onClick={() => onChange(!checked)}
            >
                <div className={styles["handle"]}></div>
            </div>
            <div className={styles["label"]}>{label}</div>
        </div>
    );
}
