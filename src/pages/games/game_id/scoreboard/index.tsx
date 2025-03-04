import { cn } from "@/utils";
import { ChampionChart } from "./champion-chart";
import { useEffect, useState } from "react";
import { ScoreRecord } from "@/models/game";
import { useGameStore } from "@/storages/game";
import { getGameScoreboard } from "@/api/games/game_id";
import { Pagination } from "@/components/ui/pagination";

export default function Index() {
    const { currentGame } = useGameStore();
    const [scoreboard, setScoreboard] = useState<Array<ScoreRecord>>();
    const [total, setTotal] = useState<number>(0);
    const [size, setSize] = useState<number>(10);
    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        getGameScoreboard({
            id: currentGame?.id!,
            size: 10,
            page,
        }).then((res) => {
            setTotal(res.total || 0);
            setScoreboard(res.data);
        });
    }, [currentGame?.id, page, size]);

    return (
        <div
            className={cn([
                "mx-60",
                "my-10",
                "flex",
                "flex-col",
                "gap-10",
                "items-center",
            ])}
        >
            <ChampionChart scoreboard={scoreboard} />
            <Pagination value={page} onChange={setPage} total={total} />
        </div>
    );
}
