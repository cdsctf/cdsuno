import React, { useState } from "react";
import { InputBase, InputBaseProps } from "../_blocks/InputBase";
import clsx from "clsx";
import styles from "./Select.module.scss";
import { Popover } from "../Popover";
import { Box } from "../Box";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { useThemeStore } from "@/stores/theme";

export interface SelectProps extends Omit<InputBaseProps, "onChange"> {
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: React.ReactElement }[];
    icon?: React.ReactNode;
}

export function Select(props: SelectProps) {
    const {
        width,
        color = "primary",
        invalid = false,
        variant = "outlined",
        icon,
        value = "",
        onChange,
        options,
        label = "",
        helperText = "",
        errorText = "",
        style,
        className,
        ...rest
    } = props;

    const [open, setOpen] = useState<boolean>(false);
    const themeStore = useThemeStore();

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
            style={style}
            {...rest}
        >
            {icon && <div className={styles["icon"]}>{icon}</div>}
            <Popover
                controlled
                open={open}
                onOpenChange={setOpen}
                style={{
                    width: "100%",
                }}
                content={
                    <OverlayScrollbarsComponent
                        defer
                        options={{
                            scrollbars: {
                                theme: `os-theme-${themeStore.darkMode ? "light" : "dark"}`,
                                autoHide: "scroll",
                            },
                        }}
                        className={styles["dropdown"]}
                    >
                        {options.map((option) => (
                            <Box
                                className={styles["option"]}
                                key={option.value}
                                onClick={() => {
                                    onChange(option.value);
                                    setOpen(false);
                                }}
                            >
                                {option.label}
                            </Box>
                        ))}
                    </OverlayScrollbarsComponent>
                }
            >
                <Box onClick={() => setOpen(true)} className={styles["value"]}>
                    {options.find((option) => option.value === value)?.label}
                </Box>
            </Popover>
        </InputBase>
    );
}
