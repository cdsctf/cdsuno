import useThemeColor from "@/hooks/useThemeColor";
import UserCircleBold from "~icons/solar/user-circle-bold";
import { ComponentProps } from "react";
import { Avatar as ArkAvatar } from "@ark-ui/react";
import clsx from "clsx";

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
            className={clsx(
                "w-[var(--avatar-size)] h-[var(--avatar-size)]",
                "flex justify-center items-center",
                "rounded-[50%]",
                "border-2 border-solid border-[var(--avatar-border-color)]"
            )}
            style={{
                ...variables,
                ...style,
            }}
            {...rest}
        >
            <ArkAvatar.Fallback
                className={clsx(
                    "w-[92.5%] h-[92.5%] overflow-hidden",
                    "text-[var(--avatar-border-color)] text-center text-[1.5rem]"
                )}
            >
                {fallback || alt.charAt(0).toUpperCase()}
            </ArkAvatar.Fallback>
            <ArkAvatar.Image
                src={src}
                alt={alt}
                draggable={false}
                className={clsx("w-[92.5%] h-[92.5%] rounded-[50%]")}
            />
        </ArkAvatar.Root>
    );
}
