import * as React from "react";
import * as RadixTooltip from "@radix-ui/react-tooltip";

import { cn } from "@/utils";

interface TooltipProps extends React.ComponentProps<typeof TooltipTrigger> {
    slotProps?: {
        content?: Partial<React.ComponentProps<typeof TooltipContent>>;
        provider?: Partial<React.ComponentProps<typeof TooltipProvider>>;
    };
}

function Tooltip(props: TooltipProps) {
    const { slotProps, ...rest } = props;

    return (
        <TooltipProvider {...slotProps?.provider}>
            <TooltipRoot>
                <TooltipTrigger {...rest} />
                <TooltipContent {...slotProps?.content} />
            </TooltipRoot>
        </TooltipProvider>
    );
}

function TooltipProvider({
    delayDuration = 0,
    ...props
}: React.ComponentProps<typeof RadixTooltip.Provider>) {
    return (
        <RadixTooltip.Provider
            data-slot="tooltip-provider"
            delayDuration={delayDuration}
            {...props}
        />
    );
}

function TooltipRoot({
    ...props
}: React.ComponentProps<typeof RadixTooltip.Root>) {
    return <RadixTooltip.Root data-slot="tooltip" {...props} />;
}

function TooltipTrigger({
    ...props
}: React.ComponentProps<typeof RadixTooltip.Trigger>) {
    return <RadixTooltip.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent({
    className,
    sideOffset = 2,
    children,
    ...props
}: React.ComponentProps<typeof RadixTooltip.Content>) {
    return (
        <RadixTooltip.Portal>
            <RadixTooltip.Content
                data-slot="tooltip-content"
                sideOffset={sideOffset}
                className={cn(
                    [
                        "bg-primary",
                        "text-primary-foreground",
                        "animate-in",
                        "fade-in-0",
                        "zoom-in-95",
                        "data-[state=closed]:animate-out",
                        "data-[state=closed]:fade-out-0",
                        "data-[state=closed]:zoom-out-95",
                        "data-[side=bottom]:slide-in-from-top-2",
                        "data-[side=left]:slide-in-from-right-2",
                        "data-[side=right]:slide-in-from-left-2",
                        "data-[side=top]:slide-in-from-bottom-2",
                        "z-50",
                        "max-w-sm",
                        "rounded-md",
                        "px-3",
                        "py-1.5",
                        "text-xs",
                    ],
                    className
                )}
                {...props}
            >
                {children}
                <RadixTooltip.Arrow
                    className={cn([
                        "bg-primary",
                        "fill-primary",
                        "z-50",
                        "size-2.5",
                        "translate-y-[calc(-50%_-_2px)]",
                        "rotate-45",
                        "rounded-[2px]",
                    ])}
                />
            </RadixTooltip.Content>
        </RadixTooltip.Portal>
    );
}

export { Tooltip };
