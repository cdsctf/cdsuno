import { Challenge } from "@/models/challenge";
import { cn } from "@/utils";
import * as React from "react";
import { Flag } from "lucide-react";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";
import { useCategoryStore } from "@/storages/category";
import { Badge } from "../ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { ChallengeStatus } from "@/api/challenges";

interface ChallengeCardProps extends React.ComponentProps<"div"> {
    challenge?: Challenge;
    status?: ChallengeStatus;
}

function ChallengeCard(props: ChallengeCardProps) {
    const { challenge, status, className, ...rest } = props;
    const { getCategory } = useCategoryStore();

    const category = React.useMemo(() => {
        return getCategory(challenge?.category);
    }, [challenge?.category]);
    const CategoryIcon = category?.icon!;

    return (
        <Card
            className={cn(
                [
                    "w-full",
                    "relative",
                    "select-none",
                    "p-5",
                    "overflow-hidden",
                    "rounded-xl",
                    "hover:bg-card-foreground/10",
                    "shadow-sm",
                    "transition-colors",
                    "duration-200",
                    "cursor-pointer",
                ],
                className
            )}
            {...rest}
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
                <CategoryIcon className={cn(["size-36"])} />
            </span>
            {status?.is_solved && (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Flag
                            className={cn([
                                "absolute",
                                "top-[10%]",
                                "right-[7%]",
                                "size-5",
                            ])}
                            fill={category.color}
                            color={category.color}
                        />
                    </TooltipTrigger>
                    <TooltipContent sideOffset={0}>已解决</TooltipContent>
                </Tooltip>
            )}
            <Badge
                variant={"tonal"}
                className={cn([
                    "bg-[var(--color-badge)]/10",
                    "text-[var(--color-badge)]",
                ])}
                style={
                    {
                        "--color-badge": category.color,
                    } as React.CSSProperties
                }
            >
                {category.name?.toUpperCase()}
            </Badge>
            <h3
                className={cn([
                    "my-2",
                    "text-xl",
                    "text-ellipsis",
                    "overflow-hidden",
                    "text-nowrap",
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
