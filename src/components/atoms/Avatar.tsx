import { Avatar as ArkAvatar } from "@ark-ui/react";
import styles from "@/styles/components/atoms/Avatar.module.scss";
import UserCircleBoldDuotone from "~icons/solar/user-circle-bold-duotone";
import useThemeColor from "@/hooks/useThemeColor";

export interface AvatarProps extends ArkAvatar.RootProps {
    src: string;
    alt?: string;
    color?: string;
    fallback?: React.ReactNode;
    size?: string;
    style?: React.CSSProperties;
}

export default function Avatar(props: AvatarProps) {
    const {
        src,
        alt = "avatar",
        color = "primary",
        size = "md",
        fallback = <UserCircleBoldDuotone />,
        style,
        ...rest
    } = props;

    const baseColor = useThemeColor(color);

    const variables = {
        "--border-color": baseColor,
    } as React.CSSProperties;

    return (
        <ArkAvatar.Root
            className={`${styles["root"]} ${styles[size]}`}
            style={{
                ...variables,
                ...style,
            }}
            {...rest}
        >
            <ArkAvatar.Fallback className={styles["fallback"]}>
                {fallback}
            </ArkAvatar.Fallback>
            <ArkAvatar.Image
                className={styles["img"]}
                src={src}
                alt={alt}
                draggable={false}
            />
        </ArkAvatar.Root>
    );
}
