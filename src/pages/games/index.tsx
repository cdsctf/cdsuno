import { getGames } from "@/api/games";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Image } from "@/components/ui/image";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/ui/pagination";
import { useDebounce } from "@/hooks/use-debounce";
import { Game } from "@/models/game";
import { cn } from "@/utils";
import { Flag, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function Index() {
    const navigate = useNavigate();

    const [games, setGames] = useState<Array<Game>>();
    const [total, setTotal] = useState<number>(0);
    const [title, setTitle] = useState<string>("");
    const debouncedTitle = useDebounce(title, 500);
    const [page, setPage] = useState<number>(1);
    const [size, _setSize] = useState<number>(10);

    const [selectedGame, setSelectedGame] = useState<Game>();

    function fetchGames() {
        getGames({
            title: debouncedTitle,
            page,
            size,
        }).then((res) => {
            setTotal(res.total || 0);
            setGames(res.data);
        });
    }

    useEffect(() => {
        fetchGames();
    }, [page, size, debouncedTitle]);

    return (
        <div
            className={cn([
                "w-full",
                "p-10",
                "2xl:p-0",
                "flex",
                "flex-col-reverse",
                "2xl:flex-row",
                "gap-25",
                "2xl:h-[calc(100vh-64px)]",
                "items-center",
                "justify-center",
            ])}
        >
            <div
                className={cn([
                    "flex",
                    "h-full",
                    "py-16",
                    "flex-col",
                    "gap-5",
                    "w-full",
                    "2xl:w-90",
                    "items-center",
                ])}
            >
                <Input
                    size={"sm"}
                    icon={Search}
                    className={cn(["w-full"])}
                    placeholder={"比赛名"}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Pagination
                    size={"sm"}
                    total={Math.ceil(total / size)}
                    max={5}
                    value={page}
                    onChange={setPage}
                />
                <Card
                    className={cn([
                        "flex",
                        "flex-col",
                        "w-full",
                        "p-5",
                        "gap-3",
                        "justify-start",
                        "overflow-auto",
                    ])}
                >
                    {games?.map((game) => (
                        <Button
                            key={game?.id}
                            icon={Flag}
                            className={cn(["justify-start"])}
                            variant={
                                selectedGame?.id === game?.id
                                    ? "tonal"
                                    : "ghost"
                            }
                            onClick={() => setSelectedGame(game)}
                        >
                            {game?.title}
                        </Button>
                    ))}
                </Card>
            </div>
            <div
                className={cn([
                    "relative",
                    "select-none",
                    "w-full",
                    "2xl:w-1/2",
                ])}
            >
                <Image
                    src={`/api/games/${selectedGame?.id}/poster`}
                    className={cn([
                        "object-cover",
                        "rounded-xl",
                        "overflow-hidden",
                        "border",
                        "aspect-16/9",
                        "w-full",
                        "shadow-xl",
                    ])}
                />
                {selectedGame?.id && (
                    <Card
                        className={cn([
                            "absolute",
                            "top-0",
                            "left-0",
                            "m-6",
                            "2xl:top-auto",
                            "2xl:left-auto",
                            "2xl:-right-20",
                            "2xl:-bottom-16",
                            "p-4",
                            "bg-card/90",
                            "backdrop-blur-sm",
                            "h-24",
                            "w-128",
                            "max-w-3/4",
                            "hover:bg-card/80",
                            "cursor-pointer",
                        ])}
                        onClick={() => navigate(`/games/${selectedGame?.id}`)}
                    >
                        <div className={cn(["flex", "flex-col", "gap-1"])}>
                            <h2
                                className={cn([
                                    "text-xl",
                                    "max-w-3/4",
                                    "text-ellipsis",
                                    "overflow-hidden",
                                    "text-nowrap",
                                ])}
                            >
                                {selectedGame?.title}
                            </h2>
                            <p
                                className={cn([
                                    "text-sm",
                                    "text-secondary",
                                    "max-w-full",
                                    "text-ellipsis",
                                    "overflow-hidden",
                                    "text-nowrap",
                                ])}
                            >
                                {selectedGame?.sketch}
                            </p>
                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
}
