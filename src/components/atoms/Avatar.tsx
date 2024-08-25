import { Avatar as ArkAvatar } from "@ark-ui/react";
import styles from "@/styles/components/atoms/Avatar.module.scss";
import UserCircleBoldDuotone from "~icons/solar/user-circle-bold-duotone";

export interface AvatarProps extends ArkAvatar.RootProps {
    src: string;
    alt?: string;
    fallback?: React.ReactNode;
    size?: string;
    style?: React.CSSProperties;
}

export default function Avatar(props: AvatarProps) {
    const {
        src,
        alt = "avatar",
        size = "md",
        fallback = <UserCircleBoldDuotone />,
        style,
        ...rest
    } = props;

    return (
        <ArkAvatar.Root
            className={`${styles["root"]} ${styles[size]}`}
            style={style}
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
