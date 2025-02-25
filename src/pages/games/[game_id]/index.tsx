import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Image } from "@/components/ui/image";
import { MarkdownRender } from "@/components/utils/markdown-render";
import { useGameStore } from "@/storages/game";
import { cn } from "@/utils";
import { ArrowRight, Play, Swords } from "lucide-react";
import { useMemo } from "react";
import { useNavigate } from "react-router";

export default function Index() {
    const { currentGame, selfGameTeam } = useGameStore();
    const navigate = useNavigate();

    const status = useMemo(() => {
        if (!currentGame) return "loading";

        const startedAt = new Date(Number(currentGame.started_at) * 1000);
        const endedAt = new Date(Number(currentGame.ended_at) * 1000);

        if (startedAt > new Date()) return "upcoming";
        if (endedAt < new Date()) return "ended";
        return "ongoing";
    }, [currentGame]);

    return (
        <div
            className={cn([
                "w-full",
                "flex",
                "flex-col",
                "lg:px-30",
                "xl:px-60",
                "lg:flex-row",
                "justify-center",
                "gap-12",
            ])}
        >
            <div
                className={cn([
                    "w-full",
                    "lg:sticky",
                    "lg:top-16",
                    "lg:w-2/5",
                    "lg:h-[calc(100vh-64px)]",
                    "flex",
                    "flex-col",
                    "lg:justify-between",
                    "py-10",
                    "px-20",
                    "lg:px-0",
                    "gap-10",
                ])}
            >
                <div
                    className={cn([
                        "flex",
                        "flex-col",
                        "gap-5",
                        "items-center",
                    ])}
                >
                    <Image
                        src={`/api/games/${currentGame?.id}/poster`}
                        className={cn([
                            "object-cover",
                            "rounded-xl",
                            "overflow-hidden",
                            "border",
                            "aspect-16/9",
                            "w-full",
                            "shadow-md",
                            "select-none",
                        ])}
                    />
                    <h2 className={cn(["text-2xl"])}>{currentGame?.title}</h2>
                    <p
                        className={cn([
                            "max-w-3/4",
                            "text-sm",
                            "text-secondary",
                            "text-ellipsis",
                            "text-nowrap",
                            "whitespace-nowrap",
                            "overflow-hidden",
                        ])}
                    >
                        {currentGame?.sketch}
                    </p>
                    <Badge
                        className={cn(
                            ["bg-info", "text-info-foreground"],
                            status === "ongoing" && [
                                "bg-success",
                                "text-success-foreground",
                            ],
                            status === "ended" && [
                                "bg-error",
                                "text-error-foreground",
                            ],
                            status === "upcoming" && [
                                "bg-info",
                                "text-info-foreground",
                            ]
                        )}
                        size={"sm"}
                    >
                        {new Date(
                            Number(currentGame?.started_at) * 1000
                        ).toLocaleString()}
                        <ArrowRight />
                        {new Date(
                            Number(currentGame?.ended_at) * 1000
                        ).toLocaleString()}
                    </Badge>
                </div>
                <div>
                    {!!selfGameTeam ? (
                        <Button
                            className={cn(["w-full"])}
                            variant={"solid"}
                            level={"success"}
                            size={"lg"}
                            icon={Play}
                            disabled={
                                status !== "ongoing" || !selfGameTeam.is_allowed
                            }
                            onClick={() =>
                                navigate(`/games/${currentGame?.id}/challenges`)
                            }
                        >
                            <span>作为 {selfGameTeam?.team?.name} 参赛</span>
                            {!selfGameTeam.is_allowed && (
                                <span>（审核未通过）</span>
                            )}
                        </Button>
                    ) : (
                        <Button
                            variant={"solid"}
                            level={"info"}
                            size={"lg"}
                            className={cn(["w-full"])}
                            icon={Swords}
                            onClick={() => {}}
                        >
                            申请参赛
                        </Button>
                    )}
                </div>
            </div>
            <Card
                className={cn([
                    "lg:w-3/5",
                    "min-h-[calc(100vh-64px)]",
                    "p-15",
                    "rounded-none",
                    "border-y-0",
                    "shadow-md",
                ])}
            >
                <MarkdownRender src={currentGame?.description} />
            </Card>
        </div>
    );
}
