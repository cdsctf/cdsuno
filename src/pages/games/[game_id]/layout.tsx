import { Outlet, useParams } from "react-router";
import { Context } from "./context";
import { useSharedStore } from "@/storages/shared";
import { useEffect, useState } from "react";
import { Game } from "@/models/game";
import { getGames, getGameTeams } from "@/api/game";
import { GameTeam } from "@/models/game_team";
import { useAuthStore } from "@/storages/auth";

export default function () {
    const { game_id } = useParams<{ game_id: string }>();
    const sharedStore = useSharedStore();
    const authStore = useAuthStore();

    const [game, setGame] = useState<Game>();
    const [selfGameTeam, setSelfGameTeam] = useState<GameTeam>();
    const [gtLoaded, setGtLoaded] = useState<boolean>(false);

    function fetchGame() {
        getGames({
            id: Number(game_id),
        }).then((res) => {
            setGame(res?.data?.[0]);
        });
    }

    function fetchSelfGameTeam() {
        getGameTeams({
            game_id: Number(game_id),
            user_id: authStore?.user?.id,
        })
            .then((res) => {
                setSelfGameTeam(res.data?.[0]);
            })
            .finally(() => {
                setGtLoaded(true);
            });
    }

    useEffect(() => {
        if (authStore?.user) {
            fetchSelfGameTeam();
        }
    }, [sharedStore?.refresh]);

    useEffect(() => {
        fetchGame();
    }, [sharedStore?.refresh]);

    return (
        <Context.Provider value={{ game, selfGameTeam, gtLoaded }}>
            <Outlet />
        </Context.Provider>
    );
}
