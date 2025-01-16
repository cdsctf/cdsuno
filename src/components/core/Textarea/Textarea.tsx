import { CSSProperties } from "react";
import { Box } from "../Box";
import { InputBase, InputBaseProps } from "../_blocks/InputBase";
import styles from "./Textarea.module.scss";
import { Field as ArkField } from "@ark-ui/react";

export interface TextareaProps extends Omit<InputBaseProps, "onChange"> {
    width?: string;
    height?: string;
    value?: string;
    autoresize?: boolean;
    onChange?: (value: string) => void;
    icon?: React.ReactElement;
    readOnly?: boolean;
    disabled?: boolean;
    invalid?: boolean;
}

export function Textarea(props: TextareaProps) {
    const {
        width = "fit-content",
        height = "fit-content",
        autoresize = false,
        value,
        onChange,
        icon,
        readOnly,
        disabled,
        invalid,
        ...rest
    } = props;

    const variables = {
        "--textarea-height": height,
    } as CSSProperties;

    return (
        <InputBase
            className={styles["root"]}
            width={width}
            disabled={disabled}
            invalid={invalid}
            readOnly={readOnly}
        >
            {icon && <Box className={styles["icon"]}>{icon}</Box>}

            <ArkField.Textarea
                autoresize={autoresize}
                className={styles["textarea"]}
                value={value}
                style={variables}
                onChange={(e) => onChange?.(e.target.value)}
            />
        </InputBase>
    );
}
