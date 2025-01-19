import { CSSProperties } from "react";
import { Box } from "../Box";
import { InputBase, InputBaseProps } from "../_blocks/InputBase";
import styles from "./Textarea.module.scss";
import { Field as ArkField } from "@ark-ui/react";

export interface TextareaProps extends Omit<InputBaseProps, "onChange"> {
    width?: string;
    minHeight?: string;
    maxHeight?: string;
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
        minHeight = "fit-content",
        maxHeight = "fit-content",
        label,
        helperText,
        errorText,
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
        "--textarea-min-height":
            typeof minHeight === "number" ? `${minHeight}px` : minHeight,
        "--textarea-max-height":
            typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight,
    } as CSSProperties;

    return (
        <InputBase
            className={styles["root"]}
            width={width}
            disabled={disabled}
            invalid={invalid}
            readOnly={readOnly}
            helperText={helperText}
            errorText={errorText}
            label={label}
            icon={icon}
        >
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
