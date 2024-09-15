import React, { CSSProperties } from "react";
import InfoCircleBold from "~icons/solar/info-circle-bold";
import styles from "@/styles/components/atoms/Toast.module.scss";
import useThemeColor from "@/hooks/useThemeColor";
import chroma from "chroma-js";
import { ComponentProps } from "react";

export interface ToastProps extends ComponentProps<"div"> {
    id?: string;
    title?: string;
    description?: string;
    color?: string;
    icon?: React.ReactNode;
    type?: string;
    duration?: number;
}

export default function Toast(props: ToastProps) {
    const {
        id,
        title,
        description,
        color = "primary",
        icon = <InfoCircleBold />,
        type,
        duration = 3000,
        ...rest
    } = props;

    const baseColor = useThemeColor(color);

    // const progressBarRef = useRef<HTMLDivElement>(null);

    // useEffect(() => {
    //     if (progressBarRef.current) {
    //         progressBarRef.current.style.transition = `width ${duration}ms linear`;
    //         progressBarRef.current.style.width = "0%";
    //     }
    // }, [duration]);

    const variables = {
        "--bg-color": chroma(baseColor).alpha(0.25).hex(),
        "--grid-color": chroma(baseColor).darken(1).alpha(0.1).hex(),
        "--text-color": chroma(baseColor).darken(1.75).hex(),
        "--border-color": baseColor,
        "--border-secondary-color": `${chroma.valid(baseColor) ? chroma(baseColor).darken(0.5) : baseColor}`,
    } as CSSProperties;

    return (
        <div className={styles["root"]} style={variables} {...rest}>
            <div className={styles["icon"]}>{icon}</div>
            <div className={styles["content-wrapper"]}>
                <h2 className={styles["title"]}>{title}</h2>
                <p className={styles["description"]}>{description}</p>
            </div>
            {/* <div ref={progressBarRef} className={styles["progress-bar"]}></div> */}
        </div>
    );
}
