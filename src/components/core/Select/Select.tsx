import React, { ComponentProps, useRef, useState } from "react";
import { InputBase, InputBaseProps } from "../InputBase";
import clsx from "clsx";
import styles from "./Select.module.scss";
import { Popover } from "../Popover";
import { Box } from "../Box";
import { Stack } from "../Stack";

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
    const dropdownRef = useRef<HTMLDivElement>(null);

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
                style={{
                    width: "100%",
                }}
                content={
                    <Stack className={styles["dropdown"]} ref={dropdownRef}>
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
                    </Stack>
                }
                opened={open}
                onChange={setOpen}
                offsetX={Number(dropdownRef.current?.clientWidth) * -1}
                offsetY={20}
            >
                <Box onClick={() => setOpen(true)}>
                    {options.find((option) => option.value === value)?.label}
                </Box>
            </Popover>
        </InputBase>
    );
}
