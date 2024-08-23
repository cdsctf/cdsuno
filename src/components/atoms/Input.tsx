import { ComponentProps } from "react";
import styles from "@/styles/components/atoms/Input.module.scss";
import { getColor } from "@/utils/color";
import chroma from "chroma-js";

export interface InputProps extends ComponentProps<"input"> {
    color?: string;
    clearable?: boolean;
}

export default function Input(props: InputProps) {
    const { color = "primary", clearable = false, ...rest } = props;

    const variables = {
        "--input-bg-color": getColor(color),
        "--input-bg-secondary-color": `${chroma(getColor(color)).darken(0.5)}`,
        // "--btn-text-color": variant === "solid" ? "#fff" : getColor(color),
    } as React.CSSProperties;

    return <input className={styles["input"]} style={variables} {...rest} />;
}
