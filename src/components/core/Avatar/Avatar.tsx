import styles from "./Avatar.module.scss";
import UserCircleBoldDuotone from "~icons/solar/user-circle-bold-duotone";
import useThemeColor from "@/hooks/useThemeColor";
import { ComponentProps, useState } from "react";
import { Icon } from "../Icon";

export interface AvatarProps extends ComponentProps<"img"> {
    src: string;
    alt?: string;
    color?: string;
    fallback?: React.ReactNode;
    size?: string;
    style?: React.CSSProperties;
}

export function Avatar(props: AvatarProps) {
    const {
        src,
        alt = "",
        color = "primary",
        size = "3rem",
        fallback = <Icon icon={<UserCircleBoldDuotone />} />,
        style,
        ...rest
    } = props;

    const baseColor = useThemeColor(color);
    const [imgErr, setImgErr] = useState<boolean>(false);

    const variables = {
        "--avatar-size": size,
        "--avatar-border-color": baseColor,
    } as React.CSSProperties;

    return (
        <div
            className={styles["root"]}
            style={{
                ...variables,
                ...style,
            }}
            {...rest}
        >
            {!imgErr && src ? (
                <img
                    src={src}
                    alt={alt}
                    onError={() => setImgErr(true)}
                    draggable={false}
                    className={styles["img"]}
                />
            ) : (
                <div className={styles["fallback"]}>
                    {fallback || alt.charAt(0).toUpperCase()}
                </div>
            )}
        </div>
    );
}
