import { Outlet, useParams } from "react-router";
import { Context } from "./context";
import { useSharedStore } from "@/storages/shared";
import { useEffect, useState } from "react";
import { getGameTeams } from "@/api/game";
import { useAuthStore } from "@/storages/auth";
import { useGameStore } from "@/storages/game";

export default function () {
    const { game_id } = useParams<{ game_id: string }>();
    const { setSelfTeam } = useGameStore();
    const sharedStore = useSharedStore();
    const authStore = useAuthStore();

    const [gtLoaded, setGtLoaded] = useState<boolean>(false);

    function fetchSelfGameTeam() {
        getGameTeams({
            game_id: Number(game_id),
            user_id: authStore?.user?.id,
        })
            .then((res) => {
                setSelfTeam(res.data?.[0]);
            })
            .finally(() => {
                setGtLoaded(true);
            });
    }

    useEffect(() => {
        if (authStore?.user) {
            fetchSelfGameTeam();
        }
    }, [sharedStore?.refresh, game_id]);

    return (
        <Context.Provider value={{ gtLoaded }}>
            <Outlet />
        </Context.Provider>
    );
}
