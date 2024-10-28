import { InputBase, InputBaseProps } from "../InputBase";
import styles from "./Textarea.module.scss";

export interface TextareaProps extends Omit<InputBaseProps, "onChange"> {
    width?: string;
    value?: string;
    onChange?: (value: string) => void;
    icon?: React.ReactNode;
}

export function Textarea(props: TextareaProps) {
    const { width = "fit-content", value, onChange, icon, ...rest } = props;

    const variables = {
        "--width": width,
    } as React.CSSProperties;

    return (
        <InputBase className={styles["root"]} style={variables}>
            {icon && <div className={styles["icon"]}>{icon}</div>}
            <textarea
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
            />
        </InputBase>
    );
}
