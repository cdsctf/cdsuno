import React, { useMemo } from "react";
import { Card } from "../ui/card";
import { cn } from "@/utils";
import { Challenge } from "@/models/challenge";
import { useCategoryStore } from "@/storages/category";
import { Separator } from "../ui/separator";
import { MarkdownRender } from "../utils/markdown-render";

interface ChallengeDialogProps extends React.ComponentProps<typeof Card> {
    onClose: () => void;
    challenge?: Challenge;
}

function ChallengeDialog(props: ChallengeDialogProps) {
    const { onClose, challenge, ...rest } = props;
    const { getCategory } = useCategoryStore();

    const category = useMemo(
        () => getCategory(challenge?.category),
        [challenge?.category]
    );
    const CategoryIcon = category?.icon!;

    return (
        <Card
            className={cn([
                "p-6",
                "min-h-96",
                "w-screen",
                "md:w-2xl",
                "flex",
                "flex-col",
                "gap-5",
            ])}
        >
            <div className={cn("flex", "flex-col", "gap-3")}>
                <div className={cn(["flex", "gap-3", "items-center"])}>
                    <CategoryIcon
                        color={category?.color}
                        className={cn(["size-5"])}
                    />
                    <h3>{challenge?.title}</h3>
                </div>
                <Separator />
            </div>
            <div className={cn(["max-h-256", "overflow-auto"])}>
                <MarkdownRender src={challenge?.description} />
            </div>
        </Card>
    );
}

export { ChallengeDialog };
