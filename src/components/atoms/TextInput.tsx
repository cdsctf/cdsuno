import React, { ComponentProps, useState } from "react";
import useThemeColor from "@/hooks/useThemeColor";
import CloseCircleBold from "~icons/solar/close-circle-bold";
import EyeBold from "~icons/solar/eye-bold";
import EyeCloseBold from "~icons/solar/eye-closed-bold";
import styles from "@/styles/components/atoms/TextInput.module.scss";

export interface InputProps extends ComponentProps<"input"> {
    color?: string;
    bgColor?: string;
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

export default function Input(props: InputProps) {
    const {
        color = "primary",
        bgColor = "transparent",
        clearable = false,
        password = false,
        invalid = false,
        icon,
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
    const [_, setIsFocused] = useState(false);
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
        <div className={styles["root"]} style={variables} {...rest}>
            <label className={styles["label"]}>{label}</label>
            <p className={styles["helper-text"]}>{helperText}</p>
            <div className={styles["container"]}>
                <div className={styles["wrapper"]}>
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
                        style={style}
                    />
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
            </div>
            {invalid && <p className={styles["error-text"]}>{errorText}</p>}
        </div>
    );
}
