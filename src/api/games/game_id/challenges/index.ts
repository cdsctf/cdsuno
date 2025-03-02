import { GameChallenge } from "@/models/game_challenge";
import { Response } from "@/types";
import { alova } from "@/utils/alova";

export interface GetGameChallengeRequest {
    game_id?: number;
    challenge_id?: string;
    category?: number;
    is_enabled?: boolean;
    page?: number;
    size?: number;
}

export async function getGameChallenges(request: GetGameChallengeRequest) {
    return alova.Get<Response<Array<GameChallenge>>>(
        `/games/${request.game_id}/challenges`,
        {
            params: request,
        }
    );
}

export interface CreateGameChallengeRequest {
    game_id?: number;
    challenge_id?: string;
    is_enabled?: boolean;
    max_pts?: number;
    min_pts?: number;
    difficulty?: number;
    bonus_ratios?: Array<number>;
}

export async function createGameChallenge(request: CreateGameChallengeRequest) {
    return alova.Post<Response<GameChallenge>>(
        `/games/${request.game_id}/challenges`,
        request
    );
}
