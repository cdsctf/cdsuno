import "./Avatar.scss";
import useThemeColor from "@/hooks/useThemeColor";
import UserCircleBold from "~icons/solar/user-circle-bold";
import { ComponentProps } from "react";
import { Avatar as ArkAvatar } from "@ark-ui/react";

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
            <UserCircleBold
                className={"iconify text-primary dark:text-white"}
            />
        ),
        style,
        ...rest
    } = props;

    const baseColor = useThemeColor(color);
    const variables = {
        "--avatar-size": typeof size === "number" ? `${size}rem` : size,
        "--avatar-border-color": baseColor,
    } as React.CSSProperties;

    return (
        <ArkAvatar.Root
            className={`avatar`}
            style={{
                ...variables,
                ...style,
            }}
            {...rest}
        >
            <ArkAvatar.Fallback className={`avatar-fallback`}>
                {fallback || alt.charAt(0).toUpperCase()}
            </ArkAvatar.Fallback>
            <ArkAvatar.Image
                src={src}
                alt={alt}
                draggable={false}
                className={`avatar-img`}
            />
        </ArkAvatar.Root>
    );
}
