import React, { ComponentProps, useState } from "react";
import chroma from "chroma-js";
import { getColor } from "@/utils/color";
import styles from "@/styles/components/atoms/Card.module.scss"; // 使用CSS Modules

export interface CardProps extends ComponentProps<"div">{
    color?: string;
    size?: "sm" | "md" | "lg";
    variant?: "solid" | "outline" | "ghost";
    jusitify?: "start" | "center" | "end";
    align?: "start" | "center" | "end";
    loading?: boolean;
    text?:string
}
export default function Card(
    props: CardProps & { children?: React.ReactNode }
){
   const {
        color = "primary",
        size = "md",
        variant = "solid",
        jusitify = "center",
        align = "center",
        loading = false,
        rounded = "lg",
        children,
        text="Hello UI",
        ...rest
    } = props;
  const [selected, setSelected] = useState(false);
  const variables = {
    "--_card-border-color": `${chroma(getColor(color)).darken(0.5)}`,
    "--_card-bg-color": getColor(color),
    "--_card-text-color": variant === "solid" ? "#fff" : "#000",
} as React.CSSProperties;
  const handleClick = () => {
    setSelected(!selected);
  };
  return (
    <div
      className={`${styles["radio-button"]} ${selected ? styles.selected : ""}`}
      style={variables} {...rest}
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
};
