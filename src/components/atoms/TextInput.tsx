import React, { useState } from "react";
import useThemeColor from "@/hooks/useThemeColor";
import styles from "@/styles/components/atoms/TextInput.module.scss";
import { Field } from "@ark-ui/react";

export interface InputProps extends Field.RootProps {
    color?: string;
    bgColor?: string;
    clearable?: boolean;
    passwd?: boolean;
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
        passwd =false,
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
                    type={passwd && !isPasswordVisible ? "password" : "text"}
                    onChange={onChange}
                    placeholder={placeholder}
                    style={style}
                />
                {clearable && (
                    <button
                        className={styles["clear-button"]}
                        onClick={handleClear}
                        aria-label="Clear input"
                    >
                        <svg
                            height="24"
                            width="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM8.46504 9.87886C8.07452 9.48834 8.07452 8.85517 8.46504 8.46465C8.85557 8.07412 9.48873 8.07412 9.87925 8.46465L12.0004 10.5858L14.1209 8.4652C14.5114 8.07467 15.1446 8.07467 15.5351 8.4652C15.9257 8.85572 15.9257 9.48889 15.5351 9.87941L13.4146 12L15.5358 14.1212C15.9263 14.5117 15.9263 15.1449 15.5358 15.5354C15.1453 15.9259 14.5121 15.9259 14.1216 15.5354L12.0004 13.4142L9.87922 15.5353C9.4887 15.9258 8.85553 15.9258 8.46501 15.5353C8.07448 15.1448 8.07448 14.5116 8.46501 14.1211L10.5861 12L8.46504 9.87886Z"
                                fill="currentColor"
                            />
                        </svg>
                    </button>
                )}
                {passwd && (
                    <button
                        className={styles["toggle-button"]}
                        onClick={handleToggleVisibility}
                        aria-label="Toggle Visibility"
                    >
                        {isPasswordVisible?(
                        <svg
                            height="24"
                            width="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path 
                                fill-rule="evenodd"
                                clip-rule="evenodd" 
                                d="M3.92433 6.34034C6.12517 4.74847 9.07298 3.5 12.0003 3.5C14.9667 3.5 17.9132 4.6963 20.1117 6.27362C21.216 7.0659 22.1666 7.97876 22.8506 8.93064C23.524 9.86767 24.0005 10.9298 24.0005 12C24.0005 13.0702 23.524 14.1323 22.8506 15.0694C22.1666 16.0212 21.216 16.9341 20.1117 17.7264C17.9132 19.3037 14.9667 20.5 12.0003 20.5C9.07298 20.5 6.12517 19.2515 3.92433 17.6597C2.81727 16.8589 1.861 15.9444 1.17121 15.0063C0.497122 14.0895 0 13.0434 0 12C0 10.9566 0.497122 9.9105 1.17121 8.99373C1.861 8.05561 2.81727 7.14107 3.92433 6.34034ZM2.86482 10.2482C2.314 10.9974 2.10489 11.6023 2.10489 12C2.10489 12.3977 2.314 13.0026 2.86482 13.7518C3.39995 14.4795 4.18728 15.2458 5.15494 15.9457C7.10352 17.3551 9.62962 18.3873 12.0003 18.3873C14.4352 18.3873 16.9627 17.3887 18.8877 16.0076C19.8451 15.3207 20.6188 14.5635 21.1435 13.8334C21.6789 13.0885 21.8956 12.4568 21.8956 12C21.8956 11.5432 21.6789 10.9115 21.1435 10.1666C20.6188 9.43645 19.8451 8.67925 18.8877 7.99235C16.9627 6.61129 14.4352 5.61266 12.0003 5.61266C9.62962 5.61266 7.10352 6.64491 5.15494 8.05432C4.18728 8.75423 3.39995 9.52046 2.86482 10.2482ZM12.0001 14.4811C13.3654 14.4811 14.4722 13.3703 14.4722 11.9999C14.4722 10.6296 13.3654 9.51869 12.0001 9.51869C10.6348 9.51869 9.528 10.6296 9.528 11.9999C9.528 13.3703 10.6348 14.4811 12.0001 14.4811ZM8.46115 11.9998C8.46115 10.0383 10.0454 8.44817 11.9997 8.44817C13.954 8.44817 15.5383 10.0383 15.5383 11.9998C15.5383 13.9614 13.954 15.5515 11.9997 15.5515C10.0454 15.5515 8.46115 13.9614 8.46115 11.9998ZM11.9997 6.33551C8.88293 6.33551 6.35626 8.87151 6.35626 11.9998C6.35626 15.1281 8.88293 17.6641 11.9997 17.6641C15.1165 17.6641 17.6432 15.1281 17.6432 11.9998C17.6432 8.87151 15.1165 6.33551 11.9997 6.33551Z" 
                                fill="currentcolor"
                            />
                        </svg>
                        ):(
                        <svg 
                            height="24" 
                            width="24"  
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >   <path 
                                d="M22.8833 2.73678C23.2727 2.35354 23.2727 1.73219 22.8833 1.34895C22.4939 0.965714 21.8625 0.965714 21.4731 1.34895L1.37554 21.2632C0.986118 21.6464 0.986118 22.2678 1.37554 22.651C1.76496 23.0342 2.39633 23.0342 2.78575 22.651L22.8833 2.73678Z"
                                fill="currentcolor">
                            </path>
                            <path 
                                d="M12 3.81258C13.5841 3.81258 15.163 4.14845 16.6249 4.69781L14.9588 6.36007C13.9886 6.07849 12.9869 5.91747 12 5.91747C9.63225 5.91747 7.11167 6.92817 5.16932 8.30568C4.20447 8.98994 3.42034 9.73845 2.88801 10.4483C2.33921 11.1801 2.13562 11.7652 2.13562 12.1429C2.13562 12.5206 2.33921 13.1057 2.88801 13.8375C3.42034 14.5474 4.20447 15.2959 5.16932 15.9802C5.19802 16.0005 5.22685 16.0208 5.25581 16.041L3.74524 17.5481C2.7287 16.8015 1.84982 15.9615 1.20403 15.1004C0.531374 14.2034 0.0307312 13.1742 0.0307312 12.1429C0.0307312 11.1116 0.531374 10.0824 1.20403 9.18547C1.89315 8.26653 2.84767 7.37169 3.95167 6.58874C6.147 5.03181 9.08484 3.81258 12 3.81258Z" 
                                fill="currentcolor">
                            </path>
                            <path 
                                d="M12 6.58503C12.8039 6.58503 13.5701 6.75197 14.2641 7.05324L12.5776 8.73584C12.3899 8.70564 12.1969 8.68991 12 8.68991C10.0369 8.68991 8.47438 10.2516 8.47438 12.1428C8.47438 12.3572 8.49445 12.5673 8.5329 12.7714L6.86754 14.4329C6.54781 13.7357 6.36949 12.9608 6.36949 12.1428C6.36949 9.05753 8.90628 6.58503 12 6.58503Z" 
                                fill="currentcolor">
                            </path>
                            <path 
                                d="M17.1158 9.81688L15.4585 11.4704C15.5025 11.6882 15.5255 11.9131 15.5255 12.1428C15.5255 14.034 13.963 15.5957 12 15.5957C11.7872 15.5957 11.5792 15.5774 11.3773 15.5423L9.69934 17.2164C10.4029 17.5278 11.182 17.7006 12 17.7006C15.0936 17.7006 17.6304 15.2281 17.6304 12.1428C17.6304 11.3108 17.4459 10.5233 17.1158 9.81688Z" 
                                fill="currentcolor">
                            </path>
                            <path 
                                d="M12 18.3684C11.0165 18.3684 10.0067 18.194 9.02284 17.8914L7.36866 19.5418C8.83824 20.1162 10.4224 20.4732 12 20.4732C14.9544 20.4732 17.8908 19.305 20.0837 17.7623C21.185 16.9877 22.1339 16.0944 22.8174 15.1619C23.4896 14.2447 23.9693 13.1999 23.9693 12.1429C23.9693 11.0859 23.4896 10.0412 22.8174 9.12395C22.1743 8.24659 21.2964 7.40403 20.2776 6.66225L18.7657 8.17068C18.8016 8.19535 18.8372 8.22016 18.8727 8.24509C19.8274 8.91666 20.5978 9.65629 21.1197 10.3683C21.6527 11.0956 21.8644 11.707 21.8644 12.1429C21.8644 12.5788 21.6527 13.1903 21.1197 13.9176C20.5978 14.6295 19.8274 15.3692 18.8727 16.0407C16.9537 17.3906 14.4318 18.3684 12 18.3684Z" 
                                fill="currentcolor">
                            </path>
                        </svg>
                        )}
                    </button>
                )}
            </div>
            <Field.ErrorText className={styles["error-text"]}>
                {errorText}
            </Field.ErrorText>
        </Field.Root>
    );
}
