import { Challenge, ChallengeStatus } from "@/models/challenge";
import { cn } from "@/utils";
import * as React from "react";
import { Flag } from "lucide-react";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";
import { useCategoryStore } from "@/storages/category";
import { Badge } from "../ui/badge";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../ui/tooltip";

interface ChallengeCardProps extends React.ComponentProps<"div"> {
    challenge?: Challenge;
    status?: ChallengeStatus;
}

function ChallengeCard(props: ChallengeCardProps) {
    const { challenge, status, className, ...rest } = props;
    const { getCategory } = useCategoryStore();

    const CategoryIcon = getCategory(challenge?.category)?.icon!;

    return (
        <Card
            className={cn(
                [
                    "w-full",
                    "relative",
                    "hover:bg-card/70",
                    "select-none",
                    "p-5",
                    "overflow-hidden",
                    "rounded-xl",
                    "hover:bg-foreground/10",
                    "transition-colors",
                    "duration-200",
                    "cursor-pointer",
                ],
                className
            )}
        >
            <span
                className={cn([
                    "absolute",
                    "right-1/10",
                    "top-1/2",
                    "-translate-y-1/2",
                    "translate-x-1/2",
                    "opacity-5",
                    "size-36",
                ])}
            >
                <CategoryIcon
                    className={cn(["size-36"])}
                    // color={getCategory(challenge?.category).color}
                />
            </span>
            {status?.is_solved && (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Flag
                                className={cn([
                                    "absolute",
                                    "top-[10%]",
                                    "right-[7%]",
                                    "size-5",
                                ])}
                                color={getCategory(challenge?.category).color}
                            />
                        </TooltipTrigger>
                        <TooltipContent sideOffset={0}>已解决</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            )}
            <Badge variant={"tonal"}>
                {getCategory(challenge?.category).name?.toUpperCase()}
            </Badge>
            <h3
                className={cn([
                    "my-2",
                    "text-xl",
                    "text-ellipsis",
                    "overflow-hidden",
                    "max-w-3/4",
                ])}
            >
                {challenge?.title}
            </h3>
            <Separator className={"my-3"} />
            <div className={cn(["flex", "justify-between", "items-center"])}>
                <span className={cn(["text-sm"])}>
                    {status?.solved_times || 0} 次解出
                </span>
                <span></span>
            </div>
        </Card>
    );
}

export { ChallengeCard };
