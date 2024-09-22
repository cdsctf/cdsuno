import React, { useState } from "react";
import useThemeColor from "@/hooks/useThemeColor";
import CloseCircleBold from "~icons/solar/close-circle-bold";
import EyeBold from "~icons/solar/eye-bold";
import EyeCloseBold from "~icons/solar/eye-closed-bold";
import styles from "./TextInput.module.scss";
import { InputWrapper, InputWrapperProps } from "../InputWrapper";

export interface TextInputProps extends Omit<InputWrapperProps, "onChange"> {
    clearable?: boolean;
    password?: boolean;
    invalid?: boolean;
    value?: string;
    label?: string;
    icon?: React.ReactNode;
    placeholder?: string;
    helperText?: string;
    errorText?: string;
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

    const baseColor = useThemeColor(color);

    const variables = {
        "--bg-color": baseColor,
        "--border-color": baseColor,
    } as React.CSSProperties;

    return (
        <InputWrapper
            width={width}
            color={color}
            variant={variant}
            invalid={invalid}
            helperText={helperText}
            errorText={errorText}
            label={label}
            className={`${styles["root"]} ${className}`}
            {...rest}
        >
            {icon && <div className={styles["icon"]}>{icon}</div>}
            <input
                value={value}
                type={password && !isPasswordVisible ? "password" : "text"}
                placeholder={placeholder}
                onChange={(e) => onChange?.(e.target.value)}
            />
            {clearable && (
                <button
                    className={styles["clear-button"]}
                    onClick={handleClear}
                >
                    <CloseCircleBold />
                </button>
            )}
            {password && (
                <button
                    className={styles["toggle-button"]}
                    onClick={handleToggleVisibility}
                >
                    {isPasswordVisible ? <EyeBold /> : <EyeCloseBold />}
                </button>
            )}
        </InputWrapper>
    );
}
