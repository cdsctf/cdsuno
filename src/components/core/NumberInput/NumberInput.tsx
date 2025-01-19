import clsx from "clsx";
import { InputBase, InputBaseProps } from "../_blocks/InputBase";
import styles from "./NumberInput.module.scss";

export interface NumberInputProps extends Omit<InputBaseProps, "onChange"> {
    invalid?: boolean;
    value?: number;
    label?: string;
    icon?: React.ReactNode;
    placeholder?: string;
    onChange?: (value: number) => void;
    min?: number;
    max?: number;
    style?: React.CSSProperties;
}

export function NumberInput(props: NumberInputProps) {
    const {
        width,
        color = "primary",
        invalid = false,
        variant = "outlined",
        icon,
        value = "",
        onChange,
        label = "",
        placeholder = "",
        helperText = "",
        errorText = "",
        min,
        max,
        style,
        className,
        wrapperClassName,
        ...rest
    } = props;

    return (
        <InputBase
            width={width}
            color={color}
            variant={variant}
            invalid={invalid}
            helperText={helperText}
            errorText={errorText}
            label={label}
            className={clsx(styles["root"], className)}
            wrapperClassName={wrapperClassName}
            icon={icon}
            style={style}
            {...rest}
        >
            <input
                className={styles["input"]}
                value={value}
                type={"number"}
                placeholder={placeholder}
                onChange={(e) => onChange?.(e.target.valueAsNumber)}
                min={min}
                max={max}
            />
        </InputBase>
    );
}
