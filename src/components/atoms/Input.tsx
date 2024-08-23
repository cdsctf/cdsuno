import { ComponentProps, useState } from "react";
import styles from "@/styles/components/atoms/Input.module.scss";
import { getColor } from "@/utils/color";
import chroma from "chroma-js";

export interface InputProps extends ComponentProps<"input"> {
    color?: string;
    clearable?: boolean;
}

export default function Input(props: InputProps) {
    const { color = "primary:1", clearable = false, ...rest } = props;
    const [inputValue, setInputValue] = useState<string>(rest.value?.toString() || "");

    const handleClear = () => {
        setInputValue("");
        if (rest.onChange) {
            const event = {
                ...new Event("input"),
                target: { value: "" },
            } as unknown as React.ChangeEvent<HTMLInputElement>;
            rest.onChange(event);
        }
    };

    const variables = {
        "--input-bg-color": getColor(color),
        "--input-bg-secondary-color": `${chroma(getColor(color)).darken(0.5)}`,
    } as React.CSSProperties;

    return (
        <div className={styles.inputContainer} style={variables}>
            <input
                className={styles.input}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Input Here..."
                {...rest}
            />
            {clearable&&(
                <button className={styles.clearButton} onClick={handleClear} aria-label="Clear input">
                    <svg height="24" width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM8.46504 9.87886C8.07452 9.48834 8.07452 8.85517 8.46504 8.46465C8.85557 8.07412 9.48873 8.07412 9.87925 8.46465L12.0004 10.5858L14.1209 8.4652C14.5114 8.07467 15.1446 8.07467 15.5351 8.4652C15.9257 8.85572 15.9257 9.48889 15.5351 9.87941L13.4146 12L15.5358 14.1212C15.9263 14.5117 15.9263 15.1449 15.5358 15.5354C15.1453 15.9259 14.5121 15.9259 14.1216 15.5354L12.0004 13.4142L9.87922 15.5353C9.4887 15.9258 8.85553 15.9258 8.46501 15.5353C8.07448 15.1448 8.07448 14.5116 8.46501 14.1211L10.5861 12L8.46504 9.87886Z"
                            fill="currentColor"
                        />
                    </svg>
                </button>
            )}
        </div>
    );
}
