import { Box } from "../Box";
import { InputBase, InputBaseProps } from "../InputBase";
import styles from "./Textarea.module.scss";

export interface TextareaProps extends Omit<InputBaseProps, "onChange"> {
    width?: string;
    height?: string;
    value?: string;
    onChange?: (value: string) => void;
    icon?: React.ReactElement;
}

export function Textarea(props: TextareaProps) {
    const {
        width = "fit-content",
        height = "fit-content",
        value,
        onChange,
        icon,
        ...rest
    } = props;

    return (
        <InputBase className={styles["root"]} width={width}>
            {icon && <Box className={styles["icon"]}>{icon}</Box>}
            <textarea
                className={styles["textarea"]}
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
            />
        </InputBase>
    );
}
