import React, { ComponentProps, useState } from "react";
import useThemeColor from "@/hooks/useThemeColor";
import CloseCircleBold from "~icons/solar/close-circle-bold";
import EyeBold from "~icons/solar/eye-bold";
import EyeCloseBold from "~icons/solar/eye-closed-bold";
import styles from "@/styles/components/atoms/TextInput.module.scss";

export interface InputProps extends ComponentProps<"input"> {
    color?: string;
    constant?: boolean;
    clearable?: boolean;
    password?: boolean;
    invalid?: boolean;
    value?: string;
    label?: string;
    icon?: React.ReactNode;
    placeholder?: string;
    helperText?: string;
    errorText?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    style?: React.CSSProperties;
}

export default function TextInput(props: InputProps) {
    const {
        color = "primary",
        clearable = false,
        password = false,
        invalid = false,
        constant = false,
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
    const [isFocused, setIsFocused] = useState(value ? true : false);
    const handleFocus = () => setIsFocused(true);
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(e.target.value ? true : false);
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

    const variables = {
        "--border-color": baseColor,
    } as React.CSSProperties;

    return (
        <div
            className={`${styles["root"]} ${className}`}
            style={variables}
            {...rest}
        >
            {label && <label className={styles["label"]}>{label}</label>}
            {helperText && (
                <p className={styles["helper-text"]}>{helperText}</p>
            )}
            <div className={styles["container"]}>
                <div
                    className={`${styles["wrapper"]} ${isFocused ? styles["focus"] : ""} ${constant ? styles["constant"] : ""}`}
                >
                    {icon && <div className={styles["icon"]}>{icon}</div>}
                    <input
                        value={value}
                        type={
                            password && !isPasswordVisible ? "password" : "text"
                        }
                        placeholder={placeholder}
                        onChange={onChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
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
                </div>
            </div>
            {invalid && <p className={styles["error-text"]}>{errorText}</p>}
        </div>
    );
}
