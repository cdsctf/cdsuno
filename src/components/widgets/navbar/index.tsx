import { useLocation, useParams } from "react-router";
import { Container } from "./container";
import { Context } from "./context";
import { useEffect, useMemo } from "react";
import { useGameStore } from "@/storages/game";
import { getGames } from "@/api/game";

function Navbar() {
    const location = useLocation();
    const pathname = location.pathname;
    const { game_id } = useParams<{ game_id?: string }>();
    const { currentGame, setCurrentGame } = useGameStore();

    const mode = useMemo(() => {
        console.log(pathname, game_id);
        if (pathname.startsWith("/games") && game_id) {
            return "game";
        } else if (pathname.startsWith("/admin")) {
            return "admin";
        }
        return "default";
    }, [pathname, game_id]);

    useEffect(() => {
        if (game_id !== currentGame?.id) {
            setCurrentGame(undefined);
        }

        if (mode === "game") {
            getGames({
                id: Number(game_id),
            }).then((res) => {
                setCurrentGame(res.data?.[0]);
            });
        }
    }, [game_id]);

    return (
        <Context.Provider value={{ mode }}>
            <Container />
        </Context.Provider>
    );
}

export { Navbar };
