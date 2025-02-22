import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/utils";
import { cva, VariantProps } from "class-variance-authority";

const avatarVariants = cva(
    ["relative", "flex", "h-10", "w-10", "shrink-0", "overflow-hidden"],
    {
        variants: {
            square: {
                false: "rounded-full",
                true: "rounded-sm",
            },
        },
        defaultVariants: {
            square: false,
        },
    }
);

export interface AvatarProps
    extends React.ComponentProps<typeof AvatarPrimitive.Root>,
        VariantProps<typeof avatarVariants> {}

function Avatar(props: AvatarProps) {
    const { square, className, ref, ...rest } = props;

    return (
        <AvatarPrimitive.Root
            ref={ref}
            className={cn(avatarVariants({ square, className }))}
            {...rest}
        />
    );
}

Avatar.displayName = AvatarPrimitive.Root.displayName;

function AvatarImage({
    className,
    ref,
    ...rest
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
    return (
        <AvatarPrimitive.Image
            ref={ref}
            className={cn("aspect-square h-full w-full", className)}
            draggable={false}
            {...rest}
        />
    );
}
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

function AvatarFallback({
    className,
    ref,
    ...rest
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
    return (
        <AvatarPrimitive.Fallback
            ref={ref}
            className={cn(
                "flex h-full w-full items-center justify-center bg-muted",
                className
            )}
            {...rest}
        />
    );
}
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
