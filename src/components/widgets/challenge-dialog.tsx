import React, { useMemo } from "react";
import { Card } from "../ui/card";
import { cn } from "@/utils";
import { Challenge } from "@/models/challenge";
import { useCategoryStore } from "@/storages/category";
import { Separator } from "../ui/separator";

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
        <Card className={cn(["p-6", "min-h-96", "max-h-128", "w-172"])}>
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
        </Card>
    );
}

export { ChallengeDialog };
