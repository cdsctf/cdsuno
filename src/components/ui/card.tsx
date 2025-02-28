import * as React from "react";

import { cn } from "@/utils";

function Card(props: React.ComponentProps<"div">) {
    const { className, ref, ...rest } = props;
    return (
        <div
            ref={ref}
            className={cn(
                [
                    "rounded-lg",
                    "border",
                    "bg-card",
                    "text-card-foreground",
                    "shadow-xs",
                ],
                className
            )}
            {...rest}
        />
    );
}

function CardHeader(props: React.ComponentProps<"div">) {
    const { className, ref, ...rest } = props;
    return (
        <div
            ref={ref}
            className={cn(
                ["flex", "flex-col", "space-y-1.5", "p-6"],
                className
            )}
            {...rest}
        />
    );
}

function CardTitle(props: React.ComponentProps<"div">) {
    const { className, ref, ...rest } = props;
    return (
        <div
            ref={ref}
            className={cn(
                ["text-2xl", "font-semibold", "leading-none", "tracking-tight"],
                className
            )}
            {...rest}
        />
    );
}

function CardDescription(props: React.ComponentProps<"div">) {
    const { className, ref, ...rest } = props;
    return (
        <div
            ref={ref}
            className={cn(["text-sm", "text-muted-foreground"], className)}
            {...rest}
        />
    );
}

function CardContent(props: React.ComponentProps<"div">) {
    const { className, ref, ...rest } = props;
    return (
        <div ref={ref} className={cn(["p-6", "pt-0"], className)} {...rest} />
    );
}

function CardFooter(props: React.ComponentProps<"div">) {
    const { className, ref, ...rest } = props;
    return (
        <div
            ref={ref}
            className={cn(["flex", "items-center", "p-6", "pt-0"], className)}
            {...rest}
        />
    );
}

export {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
    CardContent,
};
