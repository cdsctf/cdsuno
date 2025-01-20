import { CSSProperties } from "react";
import { InputBase, InputBaseProps } from "../_blocks/InputBase";
import { Field as ArkField } from "@ark-ui/react";
import clsx from "clsx";

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
        variant = "outlined",
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
        className,
        wrapperClassName,
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
            className={className}
            wrapperClassName={wrapperClassName}
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
                className={clsx(
                    "w-full flex-1 bg-[transparent] border-none outline-none",
                    "min-h-[var(--textarea-min-height,auto)] max-h-[var(--textarea-max-height,auto)]",
                    "text-[16px] line-height-[1.5]",
                    "data-[variant=outlined]:text-[var(--text-color)]",
                    "disabled:cursor-not-allowed"
                )}
                data-variant={variant}
                value={value}
                style={variables}
                onChange={(e) => onChange?.(e.target.value)}
            />
        </InputBase>
    );
}
