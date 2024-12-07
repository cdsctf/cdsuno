import { ComponentProps, CSSProperties } from "react";
import styles from "./Checkbox.module.scss";
import useThemeColor from "@/hooks/useThemeColor";
import UnreadLinear from "~icons/solar/unread-linear";

export interface CheckboxProps
    extends Omit<ComponentProps<"input">, "onChange"> {
    checked: boolean;
    color?: string;
    onChange: (checked: boolean) => void;
    label?: string;
}

export function Checkbox(props: CheckboxProps) {
    const {
        checked = false,
        color = "primary",
        onChange,
        label,
        ref,
        ...rest
    } = props;

    const baseColor = useThemeColor(color);

    const variables = {
        "--checkbox-bg-color": baseColor,
    } as CSSProperties;

    return (
        <label className={styles["root"]} style={variables}>
            <input
                className={styles["input"]}
                type={"checkbox"}
                onChange={(e) => onChange(e.target.checked)}
                checked={checked}
                ref={ref}
                {...rest}
            />
            <span className={styles["checkmark"]}>
                {checked && <UnreadLinear />}
            </span>
            {label && <span className={styles["label"]}>{label}</span>}
        </label>
    );
}
