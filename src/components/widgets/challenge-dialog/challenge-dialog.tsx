import React, { useMemo } from "react";
import { Card } from "../../ui/card";
import { cn } from "@/utils";
import { Challenge } from "@/models/challenge";
import { useCategoryStore } from "@/storages/category";
import { Separator } from "../../ui/separator";
import { MarkdownRender } from "../../utils/markdown-render";
import { Context } from "./context";
import { SubmitSection } from "./submit-section";
import { Team } from "@/models/team";
import { EnvSection } from "./env-section";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";

interface ChallengeDialogProps extends React.ComponentProps<typeof Card> {
    challenge?: Challenge;
    gameTeam?: Team;
}

function ChallengeDialog(props: ChallengeDialogProps) {
    const { challenge, gameTeam, ...rest } = props;
    const { getCategory } = useCategoryStore();

    const category = useMemo(
        () => getCategory(challenge?.category),
        [challenge?.category]
    );
    const CategoryIcon = category?.icon!;

    return (
        <Context.Provider value={{ challenge, team: gameTeam }}>
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
                    <div
                        className={cn([
                            "flex",
                            "items-center",
                            "justify-between",
                        ])}
                    >
                        <div className={cn(["flex", "gap-3", "items-center"])}>
                            <CategoryIcon
                                color={category?.color}
                                className={cn(["size-5"])}
                            />
                            <h3>{challenge?.title}</h3>
                        </div>
                        {challenge?.has_attachment && (
                            <Button asChild icon={DownloadIcon} size={"sm"}>
                                <a
                                    target={"_blank"}
                                    href={`/api/challenges/${challenge?.id}/attachment`}
                                >
                                    下载附件
                                </a>
                            </Button>
                        )}
                    </div>
                    <Separator />
                </div>
                <ScrollArea
                    className={cn([
                        "flex",
                        "flex-1",
                        "max-h-144",
                        "overflow-auto",
                    ])}
                >
                    <MarkdownRender src={challenge?.description} />
                </ScrollArea>
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
