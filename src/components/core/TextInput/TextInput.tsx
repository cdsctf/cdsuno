import React, { useState } from "react";
import CloseCircleBold from "~icons/solar/close-circle-bold";
import EyeBold from "~icons/solar/eye-bold";
import EyeCloseBold from "~icons/solar/eye-closed-bold";
import styles from "./TextInput.module.scss";
import { InputBase, InputBaseProps } from "../_blocks/InputBase";
import clsx from "clsx";
import { Box } from "../Box";
import { Field as ArkField } from "@ark-ui/react";

export interface TextInputProps extends Omit<InputBaseProps, "onChange"> {
    clearable?: boolean;
    password?: boolean;
    invalid?: boolean;
    value?: string;
    label?: string;
    icon?: React.ReactNode;
    placeholder?: string;
    disabled?: boolean;
    onChange?: (value: string) => void;
    style?: React.CSSProperties;
}

export function TextInput(props: TextInputProps) {
    const {
        width,
        color = "primary",
        clearable = false,
        password = false,
        invalid = false,
        disabled = false,
        variant = "outlined",
        icon,
        value = "",
        onChange,
        label = "",
        placeholder = "",
        helperText = "",
        errorText = "",
        style,
        className,
        ...rest
    } = props;

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleClear = () => {
        if (onChange) {
            onChange("");
        }
    };

    const handleToggleVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <InputBase
            width={width}
            color={color}
            variant={variant}
            invalid={invalid}
            helperText={helperText}
            errorText={errorText}
            label={label}
            disabled={disabled}
            className={clsx(styles["root"], className)}
            style={style}
            {...rest}
        >
            {icon && <div className={styles["icon"]}>{icon}</div>}
            <ArkField.Input
                className={styles["input"]}
                value={value}
                type={password && !isPasswordVisible ? "password" : "text"}
                placeholder={placeholder}
                onChange={(e) => onChange?.(e.target.value)}
                disabled={disabled}
            />
            {clearable && (
                <Box className={styles["clear-button"]} onClick={handleClear}>
                    {<CloseCircleBold />}
                </Box>
            )}
            {password && (
                <Box
                    className={styles["toggle-button"]}
                    onClick={handleToggleVisibility}
                >
                    {isPasswordVisible ? <EyeBold /> : <EyeCloseBold />}
                </Box>
            )}
        </InputBase>
    );
}
