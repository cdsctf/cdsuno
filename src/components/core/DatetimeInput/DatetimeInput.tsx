import { DateTime } from "luxon";
import { InputBase, InputBaseProps } from "../InputBase";
import styles from "./DatetimeInput.module.scss";
import React, { useState, useRef, useEffect } from "react";
import { Box } from "../Box";

export interface DatetimeInputProps extends Omit<InputBaseProps, "onChange"> {
    icon?: React.ReactElement;
    value?: DateTime;
    onChange?: (value: DateTime) => void;
}

export function DatetimeInput(props: DatetimeInputProps) {
    const {
        icon,
        label,
        value = DateTime.now(),
        onChange,
        ref,
        ...rest
    } = props;

    const [inputValue, setInputValue] = useState(
        value.toFormat("MM/dd/yyyy HH:mm:ss")
    );
    const [lastCursorPosition, setLastCursorPosition] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setInputValue(value.toFormat("MM/dd/yyyy HH:mm:ss"));
    }, [value]);

    const segments = [
        { start: 0, end: 2, max: 12 },
        { start: 3, end: 5, max: 31 },
        { start: 6, end: 10, max: 9999 },
        { start: 11, end: 13, max: 23 },
        { start: 14, end: 16, max: 59 },
        { start: 17, end: 19, max: 59 },
    ];

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        let cursorPosition = e.target.selectionStart || 0;
        const newValue = e.target.value[cursorPosition - 1];
        if (cursorPosition === 20) {
            cursorPosition = lastCursorPosition;
        }
        setLastCursorPosition(cursorPosition);

        // console.log("cursorPosition", cursorPosition);
        // console.log("e.target.value", e.target.value);

        // console.log(newValue, /^\d$/.test(newValue));

        const segmentIndex = segments.findIndex(
            (seg) => cursorPosition >= seg.start && cursorPosition <= seg.end
        );

        if (segmentIndex === -1) return;

        const { start, end } = segments[segmentIndex];
        let segmentValue = inputValue.slice(start, end).replace(/^0+/, "");

        if (/^\d$/.test(newValue)) {
            console.log("start", start);

            console.log("segmentValue", segmentValue);

            console.log(
                "segmentValue + newValue",
                segmentValue + newValue,
                Number(segmentValue + newValue)
            );

            const sn = Number(segmentValue + newValue);

            switch (start) {
                case 0:
                    if (sn <= 12) {
                        segmentValue = String(sn).padStart(2, "0");
                    } else if (newValue === "0") {
                        segmentValue = "01";
                    } else {
                        segmentValue = newValue.padStart(2, "0");
                    }
                    break;
                case 3:
                    if (sn <= (value.daysInMonth || 0)) {
                        segmentValue = String(sn).padStart(2, "0");
                    } else if (newValue === "0") {
                        segmentValue = "01";
                    } else {
                        segmentValue = newValue.padStart(2, "0");
                    }
                    break;
                case 6:
                    if (sn <= 9999) {
                        segmentValue = String(sn).padStart(4, "0");
                    } else {
                        segmentValue = newValue.padStart(4, "0");
                    }
                    break;
                case 11:
                    if (sn <= 23) {
                        segmentValue = String(sn).padStart(2, "0");
                    } else {
                        segmentValue = newValue.padStart(2, "0");
                    }
                    break;
                case 14:
                    if (sn <= 59) {
                        segmentValue = String(sn).padStart(2, "0");
                    } else {
                        segmentValue = newValue.padStart(2, "0");
                    }
                    break;
                case 17:
                    if (sn <= 59) {
                        segmentValue = String(sn).padStart(2, "0");
                    } else {
                        segmentValue = newValue.padStart(2, "0");
                    }
                    break;
            }

            // console.log("segmentValue", segmentValue);

            const newFormattedValue =
                inputValue.slice(0, start) +
                segmentValue +
                inputValue.slice(end, inputValue.length);

            console.log("newFormattedValue", newFormattedValue);

            setInputValue(newFormattedValue);

            const newDateTime = DateTime.fromFormat(
                newFormattedValue,
                "MM/dd/yyyy HH:mm:ss"
            );
            if (newDateTime.isValid) {
                onChange?.(newDateTime);
            }
        }

        setTimeout(() => {
            // console.log("change");
            inputRef.current?.setSelectionRange(start, end);
        }, 0);
    };

    const handleFocus = (e: any) => {
        const cursorPosition = e.target.selectionStart || 0;
        const segmentIndex = segments.findIndex(
            (seg) => cursorPosition >= seg.start && cursorPosition <= seg.end
        );
        if (segmentIndex !== -1) {
            const { start, end } = segments[segmentIndex];
            setTimeout(() => {
                // console.log("click");
                inputRef.current?.setSelectionRange(start, end);
            }, 0);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!/^\d$/.test(e.key)) {
            e.preventDefault();
        }
        if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
            const cursorPosition =
                (e.target as HTMLInputElement).selectionStart || 0;
            const segmentIndex = segments.findIndex(
                (seg) =>
                    cursorPosition >= seg.start && cursorPosition <= seg.end
            );
            if (segmentIndex !== -1) {
                if (e.key === "ArrowLeft") {
                    const s = segmentIndex - 1 > -1 ? segmentIndex - 1 : 0;
                    const { start, end } = segments[s % segments.length];
                    setTimeout(() => {
                        inputRef.current?.setSelectionRange(start, end);
                    }, 0);
                } else if (e.key === "ArrowRight") {
                    const s =
                        segmentIndex + 1 < segments.length
                            ? segmentIndex + 1
                            : segments.length - 1;
                    const { start, end } = segments[s % segments.length];
                    setTimeout(() => {
                        inputRef.current?.setSelectionRange(start, end);
                    }, 0);
                }
            }
        }
    };

    return (
        <InputBase className={styles["root"]} label={label} ref={ref} {...rest}>
            {icon && <Box className={styles["icon"]}>{icon}</Box>}
            <input
                className={styles["input"]}
                type="text"
                ref={inputRef}
                value={inputValue}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onClick={handleFocus}
            />
        </InputBase>
    );
}
