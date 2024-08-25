import React, { useState } from "react";
import useThemeColor from "@/hooks/useThemeColor";
import styles from "@/styles/components/atoms/TextInput.module.scss";
import { Field } from "@ark-ui/react";
import CloseCircleBold from "~icons/solar/close-circle-bold";
import EyeBold from "~icons/solar/eye-bold";
import EyeCloseBold from "~icons/solar/eye-closed-bold";

export interface InputProps extends Field.RootProps {
    color?: string;
    bgColor?: string;
    clearable?: boolean;
    password?: boolean;
    value?: string;
    label?: string;
    placeholder?: string;
    helperText?: string;
    errorText?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    style?: React.CSSProperties;
}

export default function Input(props: InputProps) {
    const {
        color = "primary",
        bgColor = "transparent",
        clearable = false,
        password = false,
        value = "",
        onChange,
        label = "",
        placeholder = "",
        helperText = "",
        errorText = "",
        style,
        ...rest
    } = props;

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const handleFocus = () => setIsFocused(true);
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (!e.target.value) setIsFocused(false);
    };
    const handleClear = () => {
        if (onChange) {
            onChange({
                target: { value: "" },
            } as React.ChangeEvent<HTMLInputElement>);
        }
    };

    const handleToggleVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const baseColor = useThemeColor(color);
    const baseBgColor = useThemeColor(bgColor);

    const variables = {
        "--bg-color": baseBgColor,
        "--border-color": baseColor,
    } as React.CSSProperties;

    return (
        <Field.Root className={styles["root"]} style={variables} {...rest}>
            <Field.Label className={styles["label"]}>{label}</Field.Label>
            <Field.HelperText className={styles["helper-text"]}>
                {helperText}
            </Field.HelperText>
            <div className={styles["input-wrapper"]}>
                <Field.Input
                    className={styles["input"]}
                    value={value}
                    type={password && !isPasswordVisible ? "password" : "text"}
                    onChange={onChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    style={style}
                />
                {/* Placeholder span */}
                <span
                    className={`${styles["placeholder"]} ${
                        isFocused || value ? styles["placeholder-active"] : ""
                    }`}
                >
                    {placeholder}
                </span>
                {clearable && (
                    <button
                        className={styles["clear-button"]}
                        onClick={handleClear}
                        aria-label="Clear input"
                    >
                        <CloseCircleBold />
                    </button>
                )}
                {password && (
                    <button
                        className={styles["toggle-button"]}
                        onClick={handleToggleVisibility}
                        aria-label="Toggle Visibility"
                    >
                        {isPasswordVisible ? <EyeBold /> : <EyeCloseBold />}
                    </button>
                )}
            </div>
            <Field.ErrorText className={styles["error-text"]}>
                {errorText}
            </Field.ErrorText>
        </Field.Root>
    );
}
