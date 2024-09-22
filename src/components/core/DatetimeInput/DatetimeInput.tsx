import { DateTime } from "luxon";
import { InputWrapper, InputWrapperProps } from "../InputWrapper";
import styles from "./DatetimeInput.module.scss";
import { useState, useRef, useEffect } from "react";

export interface DatetimeInputProps
    extends Omit<InputWrapperProps, "onChange"> {
    value?: DateTime;
    onChange?: (value: DateTime) => void;
}

export function DatetimeInput(props: DatetimeInputProps) {
    const { label, value, onChange } = props;

    const [year, setYear] = useState<number>(
        value?.year ?? DateTime.now().year
    );
    const [month, setMonth] = useState<number>(
        value?.month ?? DateTime.now().month
    );
    const [day, setDay] = useState<number>(value?.day ?? DateTime.now().day);
    const [hour, setHour] = useState<number>(
        value?.hour ?? DateTime.now().hour
    );
    const [minute, setMinute] = useState<number>(
        value?.minute ?? DateTime.now().minute
    );
    const [second, setSecond] = useState<number>(
        value?.second ?? DateTime.now().second
    );

    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    function handleKeyDown(
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number
    ) {
        if (e.key === "ArrowRight") {
            e.preventDefault();
            inputsRef.current[
                index + 1 === inputsRef.current.length ? 0 : index + 1
            ]?.focus();
            inputsRef.current[
                index + 1 === inputsRef.current.length ? 0 : index + 1
            ]?.select();
        }

        if (e.key === "ArrowLeft") {
            e.preventDefault();
            inputsRef.current[
                index - 1 === -1 ? inputsRef.current.length - 1 : index - 1
            ]?.focus();
            inputsRef.current[
                index - 1 === -1 ? inputsRef.current.length - 1 : index - 1
            ]?.select();
        }
    }

    function handleFocus(index: number) {
        inputsRef.current[index]?.select();
    }

    useEffect(() => {
        const datetime = DateTime.fromObject({
            year,
            month,
            day,
            hour,
            minute,
            second,
        });

        if (datetime.isValid) {
            onChange?.(datetime);
        }
    }, [year, month, day, hour, minute, second, onChange]);

    const handleInputChange =
        (setter: (value: number) => void, min?: number, max?: number) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = parseInt(e.target.value, 10);
            if (!isNaN(value)) {
                if (min !== undefined && value < min) {
                    setter(min);
                } else if (max !== undefined && value > max) {
                    setter(max);
                } else {
                    setter(value);
                }
            }
        };

    return (
        <InputWrapper className={styles["root"]} label={label} invalid>
            <div className={styles["date"]}>
                <input
                    type={"number"}
                    value={String(year).padStart(4, "0")}
                    onChange={handleInputChange(setYear, 0, 9999)}
                    onKeyDown={(e) => handleKeyDown(e, 0)}
                    onFocus={() => handleFocus(0)}
                    min={0}
                    max={9999}
                    placeholder="YYYY"
                    ref={(el) => (inputsRef.current[0] = el)}
                    className={styles["year"]}
                />
                <span>-</span>
                <input
                    type={"number"}
                    value={String(month).padStart(2, "0")}
                    onChange={handleInputChange(setMonth, 1, 12)}
                    onKeyDown={(e) => handleKeyDown(e, 1)}
                    onFocus={() => handleFocus(1)}
                    min={1}
                    max={12}
                    placeholder="MM"
                    ref={(el) => (inputsRef.current[1] = el)}
                />
                <span>-</span>
                <input
                    type={"number"}
                    value={String(day).padStart(2, "0")}
                    onChange={handleInputChange(
                        setDay,
                        1,
                        DateTime.fromObject({ year, month }).daysInMonth
                    )}
                    onKeyDown={(e) => handleKeyDown(e, 2)}
                    onFocus={() => handleFocus(2)}
                    min={1}
                    max={DateTime.fromObject({ year, month }).daysInMonth}
                    placeholder="DD"
                    ref={(el) => (inputsRef.current[2] = el)}
                />
            </div>
            <div className={styles["time"]}>
                <input
                    type={"number"}
                    value={String(hour).padStart(2, "0")}
                    onChange={handleInputChange(setHour, 0, 23)}
                    onKeyDown={(e) => handleKeyDown(e, 3)}
                    onFocus={() => handleFocus(3)}
                    min={0}
                    max={23}
                    placeholder="HH"
                    ref={(el) => (inputsRef.current[3] = el)}
                />
                <span>:</span>
                <input
                    type={"number"}
                    value={String(minute).padStart(2, "0")}
                    onChange={handleInputChange(setMinute, 0, 59)}
                    onKeyDown={(e) => handleKeyDown(e, 4)}
                    onFocus={() => handleFocus(4)}
                    min={0}
                    max={59}
                    placeholder="mm"
                    ref={(el) => (inputsRef.current[4] = el)}
                />
                <span>:</span>
                <input
                    type={"number"}
                    value={String(second).padStart(2, "0")}
                    onChange={handleInputChange(setSecond, 0, 59)}
                    onKeyDown={(e) => handleKeyDown(e, 5)}
                    onFocus={() => handleFocus(5)}
                    min={0}
                    max={59}
                    placeholder="ss"
                    ref={(el) => (inputsRef.current[5] = el)}
                />
            </div>
        </InputWrapper>
    );
}
