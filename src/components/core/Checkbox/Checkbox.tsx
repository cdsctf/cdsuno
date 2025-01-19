import { ComponentProps, CSSProperties } from "react";
import useThemeColor from "@/hooks/useThemeColor";
import UnreadLinear from "~icons/solar/unread-linear";
import { Checkbox as ArkCheckbox } from "@ark-ui/react";
import styles from "./Checkbox.module.scss";

export interface CheckboxProps {
    checked: boolean;
    color?: string;
    onChange: (checked: boolean) => void;
    label?: string;
    ref?: ComponentProps<"label">["ref"];
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
        <ArkCheckbox.Root
            checked={checked}
            onCheckedChange={(e) => onChange(Boolean(e.checked))}
            className={styles["checkbox"]}
            style={variables}
            ref={ref}
        >
            <ArkCheckbox.Control
                data-checked={checked}
                className={styles["checkbox-control"]}
            >
                <ArkCheckbox.Indicator className={styles["checkbox-indicator"]}>
                    <UnreadLinear />
                </ArkCheckbox.Indicator>
            </ArkCheckbox.Control>
            <ArkCheckbox.HiddenInput />

            {label && <ArkCheckbox.Label>{label}</ArkCheckbox.Label>}
        </ArkCheckbox.Root>
    );
}
