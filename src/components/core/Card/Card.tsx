import React, { ComponentProps, useState } from "react";
import chroma from "chroma-js";
import useThemeColor from "@/hooks/useThemeColor";
import styles from "./Card.module.scss"; // 使用CSS Modules

export interface CardProps extends ComponentProps<"div"> {
    color?: string;
    size?: "sm" | "md" | "lg";
    rounded?: "sm" | "md" | "lg";
    variant?: "solid" | "outlined" | "ghost";
    jusitify?: "start" | "center" | "end";
    align?: "start" | "center" | "end";
    loading?: boolean;
    text?: string;
}
export function Card(props: CardProps & { children?: React.ReactNode }) {
    const {
        color = "primary",
        size = "md",
        variant = "solid",
        jusitify = "center",
        align = "center",
        loading = false,
        rounded = "lg",
        children,
        text = "Hello UI",
        ...rest
    } = props;
    const [selected, setSelected] = useState(false);
    const baseColor = useThemeColor(color);
    const variables = {
        "--_card-border-color": `${chroma.valid(baseColor) ? chroma(baseColor).darken(0.5) : baseColor}`,
        "--_card-bg-color": baseColor,
        "--_card-text-color": variant === "solid" ? "#fff" : "#000",
    } as React.CSSProperties;
    const handleClick = () => {
        setSelected(!selected);
    };
    return (
        <div
            className={`${styles["radio-button"]} ${selected ? styles.selected : ""}`}
            style={variables}
            {...rest}
            onClick={handleClick}
            role="radio"
            aria-checked={selected}
            tabIndex={0}
        >
            <div className={`${styles["flex-container"]}`}>
                <img
                    className={styles.icon}
                    draggable="false"
                    src="https://img.icons8.com/?size=100&id=dnfBMQifUek5&format=png&color=000000"
                    alt="icon"
                />
                <span className={styles["proficiency-text"]}>{text}</span>
            </div>
        </div>
    );
}
