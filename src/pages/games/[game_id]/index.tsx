import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Image } from "@/components/ui/image";
import { MarkdownRender } from "@/components/utils/markdown-render";
import { useGameStore } from "@/storages/game";
import { cn } from "@/utils";
import { Play } from "lucide-react";

export default function Index() {
    const { currentGame } = useGameStore();

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
                    <p className={cn(["text-sm", "text-secondary"])}>
                        {currentGame?.sketch}
                    </p>
                </div>
                <div>
                    <Button
                        className={cn(["w-full"])}
                        variant={"tonal"}
                        level={"primary"}
                        size={"lg"}
                        icon={Play}
                    >
                        参与
                    </Button>
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
