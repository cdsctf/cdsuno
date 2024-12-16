import {
    Game,
    GameGetRequest,
    GameScoreboardGetRequest,
    ScoreRecord,
} from "@/models/game";
import { Result } from "@/types";
import { alovaInstance } from "@/utils/alova";

export async function get(request: GameGetRequest) {
    return alovaInstance.Get<Result<Array<Game>>>("/games", {
        params: request,
    });
}

export async function getScoreboard(
    id: number,
    request: GameScoreboardGetRequest
) {
    return alovaInstance.Get<Result<Array<ScoreRecord>>>(
        `/games/${id}/scoreboard`,
        {
            params: request,
        }
    );
}
