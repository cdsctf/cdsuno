import { DateTime } from "luxon";
import { CSSProperties, useEffect, useRef, useState } from "react";
import styles from "@/styles/components/atoms/DatetimePicker.module.scss";
import TextInput from "./TextInput";
import useThemeColor from "@/hooks/useThemeColor";
import ArrowLeftLinear from "~icons/solar/arrow-left-linear";
import ArrowRightLinear from "~icons/solar/arrow-right-linear";

export interface DatetimePickerProps {
    value: DateTime;
    onChange: (value: DateTime) => void;
}

export default function DatetimePicker(props: DatetimePickerProps) {
    const { value, onChange } = props;

    const [open, setOpen] = useState<boolean>(false);
    const [selectedDateTime, setSelectedDateTime] = useState<DateTime>(value);
    const [timeInputs, setTimeInputs] = useState({
        hour: selectedDateTime.toFormat("HH"),
        minute: selectedDateTime.toFormat("mm"),
        second: selectedDateTime.toFormat("ss"),
    });

    const pickerRef = useRef<HTMLDivElement>(null);

    const togglePicker = () => setOpen(!open);

    function handleDateChange(day: number) {
        const newDateTime = selectedDateTime.set({ day });
        setSelectedDateTime(newDateTime);
    }

    const handleTimeInputChange = (
        unit: "hour" | "minute" | "second",
        value: string
    ) => {
        setTimeInputs((prev) => ({ ...prev, [unit]: value }));
    };

    const applyChanges = () => {
        const hour = parseInt(timeInputs.hour, 10);
        const minute = parseInt(timeInputs.minute, 10);
        const second = parseInt(timeInputs.second, 10);

        if (
            isNaN(hour) ||
            isNaN(minute) ||
            isNaN(second) ||
            hour < 0 ||
            hour > 23 ||
            minute < 0 ||
            minute > 59 ||
            second < 0 ||
            second > 59
        ) {
            setTimeInputs({
                hour: selectedDateTime.toFormat("HH"),
                minute: selectedDateTime.toFormat("mm"),
                second: selectedDateTime.toFormat("ss"),
            });
            return;
        }

        const newDateTime = selectedDateTime.set({ hour, minute, second });
        setSelectedDateTime(newDateTime);

        // 调用 onChange 来通知外部组件值的变化
        onChange?.(newDateTime);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                pickerRef.current &&
                !pickerRef.current.contains(event.target as Node)
            ) {
                applyChanges(); // 保存日期和时间的变化
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [timeInputs, selectedDateTime]);

    const variables = {
        "--border-color": useThemeColor("primary"),
    } as CSSProperties;

    const daysInMonth = selectedDateTime.daysInMonth || 31;
    const firstDayOfMonth = selectedDateTime.startOf("month").weekday;

    return (
        <div className={styles["root"]} style={variables}>
            <TextInput
                value={selectedDateTime.toFormat("yyyy-MM-dd HH:mm:ss")}
                onClick={togglePicker}
                readOnly
            />
            {open && (
                <div className={styles["picker-container"]} ref={pickerRef}>
                    <div className={styles["date-picker"]}>
                        <div className={styles["month-year"]}>
                            <button
                                onClick={() =>
                                    setSelectedDateTime(
                                        selectedDateTime.minus({ months: 1 })
                                    )
                                }
                            >
                                <ArrowLeftLinear />
                            </button>
                            <span>
                                {selectedDateTime.toFormat("MMMM yyyy")}
                            </span>
                            <button
                                onClick={() =>
                                    setSelectedDateTime(
                                        selectedDateTime.plus({ months: 1 })
                                    )
                                }
                            >
                                <ArrowRightLinear />
                            </button>
                        </div>
                        <div className={styles["weekdays"]}>
                            {[
                                "Sun",
                                "Mon",
                                "Tue",
                                "Wed",
                                "Thu",
                                "Fri",
                                "Sat",
                            ].map((day) => (
                                <div key={day} className={styles["weekday"]}>
                                    {day}
                                </div>
                            ))}
                        </div>
                        <div className={styles["days"]}>
                            {Array.from(
                                { length: firstDayOfMonth - 1 },
                                (_, i) => (
                                    <div
                                        key={`empty-${i}`}
                                        className={`${styles["day"]} ${styles["empty"]}`}
                                    ></div>
                                )
                            )}
                            {Array.from({ length: daysInMonth }, (_, i) => (
                                <div
                                    key={i + 1}
                                    className={`${styles["day"]} ${selectedDateTime.day === i + 1 ? styles["selected"] : ""}`}
                                    onClick={() => handleDateChange(i + 1)}
                                >
                                    {i + 1}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles["time-picker"]}>
                        <input
                            type="text"
                            value={timeInputs.hour}
                            onChange={(e) =>
                                handleTimeInputChange("hour", e.target.value)
                            }
                            onBlur={applyChanges}
                            maxLength={2}
                        />
                        <span className={styles["time-separator"]}>:</span>
                        <input
                            type="text"
                            value={timeInputs.minute}
                            onChange={(e) =>
                                handleTimeInputChange("minute", e.target.value)
                            }
                            onBlur={applyChanges}
                            maxLength={2}
                        />
                        <span className={styles["time-separator"]}>:</span>
                        <input
                            type="text"
                            value={timeInputs.second}
                            onChange={(e) =>
                                handleTimeInputChange("second", e.target.value)
                            }
                            onBlur={applyChanges}
                            maxLength={2}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
