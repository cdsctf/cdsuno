import { DateTime } from "luxon";
import { CSSProperties, useEffect, useRef, useState } from "react";
import styles from "./DatetimePicker.module.scss";
import useThemeColor from "@/hooks/useThemeColor";
import ArrowLeftLinear from "~icons/solar/arrow-left-linear";
import ArrowRightLinear from "~icons/solar/arrow-right-linear";
import CalendarBold from "~icons/solar/calendar-bold";
import { CSSTransition } from "react-transition-group";
import { Badge } from "../Badge";
import { DatetimeInput } from "../DatetimeInput";

export interface DatetimePickerProps {
    value: DateTime;
    onChange: (value: DateTime) => void;
    icon?: React.ReactNode;
}

export function DatetimePicker(props: DatetimePickerProps) {
    const { value = DateTime.now(), onChange, icon = <CalendarBold /> } = props;

    const [open, setOpen] = useState<boolean>(false);
    const [selectedDateTime, setSelectedDateTime] = useState<DateTime>(value);

    const pickerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    function handleDateChange(day: number) {
        const newDateTime = selectedDateTime.set({ day });
        setSelectedDateTime(newDateTime);
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                pickerRef.current &&
                !pickerRef.current.contains(event.target as Node) &&
                inputRef.current &&
                !inputRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [selectedDateTime]);

    const variables = {
        "--dtp-border-color": useThemeColor("primary"),
    } as CSSProperties;

    const daysInMonth = selectedDateTime.daysInMonth || 31;
    const firstDayOfMonth = selectedDateTime.startOf("month").weekday;

    return (
        <div className={styles["root"]} style={variables}>
            <DatetimeInput
                value={selectedDateTime}
                onChange={(value) => setSelectedDateTime(value)}
                onClick={() => setOpen(true)}
                icon={icon}
                ref={inputRef}
            />
            <CSSTransition
                in={open}
                timeout={300}
                nodeRef={pickerRef}
                unmountOnExit
                classNames={{
                    enter: styles["enter"],
                    enterActive: styles["enter-active"],
                    exit: styles["exit"],
                    exitActive: styles["exit-active"],
                }}
            >
                <div className={styles["container"]} ref={pickerRef}>
                    <div className={styles["wrapper"]}>
                        <div className={styles["date-picker"]}>
                            <div className={styles["month-year"]}>
                                <button
                                    onClick={() =>
                                        setSelectedDateTime(
                                            selectedDateTime.minus({
                                                months: 1,
                                            })
                                        )
                                    }
                                >
                                    <ArrowLeftLinear />
                                </button>
                                <Badge>
                                    {selectedDateTime.toFormat("yyyy / MM")}
                                </Badge>
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
                                    <div
                                        key={day}
                                        className={styles["weekday"]}
                                    >
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
                    </div>
                </div>
            </CSSTransition>
        </div>
    );
}
