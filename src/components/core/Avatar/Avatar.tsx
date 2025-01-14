import styles from "./Avatar.module.scss";
import UserCircleBold from "~icons/solar/user-circle-bold";
import useThemeColor from "@/hooks/useThemeColor";
import { ComponentProps, useState } from "react";
import { Box } from "../Box";

export interface AvatarProps extends ComponentProps<"img"> {
    src: string;
    alt?: string;
    color?: string;
    fallback?: React.ReactNode;
    size?: string | number;
    style?: React.CSSProperties;
}

export function Avatar(props: AvatarProps) {
    const {
        src,
        alt = "",
        color = "primary",
        size = "3rem",
        fallback = (
            <UserCircleBold color="light-dark(var(--color-primary), #fff)" />
        ),
        style,
        ...rest
    } = props;

    const baseColor = useThemeColor(color);
    const [imgErr, setImgErr] = useState<boolean>(false);

    const variables = {
        "--avatar-size": typeof size === "number" ? `${size}rem` : size,
        "--avatar-border-color": baseColor,
    } as React.CSSProperties;

    return (
        <Box
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
                <Box className={styles["fallback"]}>
                    {fallback || alt.charAt(0).toUpperCase()}
                </Box>
            )}
        </Box>
    );
}
