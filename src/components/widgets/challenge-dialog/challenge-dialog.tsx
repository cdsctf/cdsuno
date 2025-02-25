import React, { useMemo } from "react";
import { Card } from "../../ui/card";
import { cn } from "@/utils";
import { Challenge } from "@/models/challenge";
import { useCategoryStore } from "@/storages/category";
import { Separator } from "../../ui/separator";
import { MarkdownRender } from "../../utils/markdown-render";
import { Context } from "./context";
import { SubmitSection } from "./submit-section";
import { GameTeam } from "@/models/game_team";
import { EnvSection } from "./env-section";

interface ChallengeDialogProps extends React.ComponentProps<typeof Card> {
    onClose: () => void;
    challenge?: Challenge;
    gameTeam?: GameTeam;
}

function ChallengeDialog(props: ChallengeDialogProps) {
    const { onClose, challenge, gameTeam, ...rest } = props;
    const { getCategory } = useCategoryStore();

    const category = useMemo(
        () => getCategory(challenge?.category),
        [challenge?.category]
    );
    const CategoryIcon = category?.icon!;

    return (
        <Context.Provider value={{ challenge, gameTeam }}>
            <Card
                className={cn([
                    "p-6",
                    "min-h-128",
                    "w-screen",
                    "md:w-3xl",
                    "flex",
                    "flex-col",
                    "gap-5",
                ])}
                {...rest}
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
                <div
                    className={cn([
                        "flex",
                        "flex-1",
                        "max-h-144",
                        "overflow-auto",
                    ])}
                >
                    <MarkdownRender src={challenge?.description} />
                </div>
                {challenge?.is_dynamic && <EnvSection />}
                <div className={cn("flex", "flex-col", "gap-3")}>
                    <Separator />
                    <SubmitSection />
                </div>
            </Card>
        </Context.Provider>
    );
}

export { ChallengeDialog };
