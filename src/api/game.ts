import {
    Game,
    GameGetRequest,
    GameScoreboardGetRequest,
    ScoreRecord,
} from "@/models/game";
import { Response } from "@/types";
import { alovaInstance } from "@/utils/alova";

export async function get(request: GameGetRequest) {
    return alovaInstance.Get<Response<Array<Game>>>("/games", {
        params: request,
    });
}

export async function getScoreboard(
    id: number,
    request: GameScoreboardGetRequest
) {
    return alovaInstance.Get<Response<Array<ScoreRecord>>>(
        `/games/${id}/scoreboard`,
        {
            params: request,
        }
    );
}
