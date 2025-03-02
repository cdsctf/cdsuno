import { Game, ScoreRecord } from "@/models/game";
import { GameChallenge } from "@/models/game_challenge";
import { GameNotice } from "@/models/game_notice";
import { Team } from "@/models/team";
import { Metadata } from "@/models/media";
import { Response } from "@/types";
import { alova } from "@/utils/alova";

export interface GetGameRequest {
    id?: number;
    title?: string;
    is_enabled?: boolean;
    sorts?: string;
    page?: number;
    size?: number;
}

export async function getGames(request: GetGameRequest) {
    return alova.Get<Response<Array<Game>>>("/games", {
        params: request,
    });
}

export interface CreateGameRequest {
    title?: string;
    sketch?: string;
    description?: string;
    is_enabled?: boolean;
    is_public?: boolean;
    is_need_write_up?: boolean;
    member_limit_min?: number;
    member_limit_max?: number;
    started_at?: number;
    ended_at?: number;
}

export async function createGame(request: CreateGameRequest) {
    return alova.Post<Response<Game>>("/games", request);
}

export interface GetGameNoticeRequest {
    game_id?: number;
}

export async function getGameNotice(request: GetGameNoticeRequest) {
    return alova.Get<Response<Array<GameNotice>>>(
        `/games/${request.game_id}/notices`,
        {
            params: request,
        }
    );
}

export interface CreateGameNoticeRequest {
    game_id?: number;
    title?: string;
    content?: string;
}

export async function createGameNotice(request: CreateGameNoticeRequest) {
    return alova.Post<Response<GameNotice>>(
        `/games/${request.game_id}/notices`,
        request
    );
}

export interface DeleteGameNoticeRequest {
    id?: number;
    game_id?: number;
}

export async function deleteGameNotice(request: DeleteGameNoticeRequest) {
    return alova.Delete<Response<never>>(
        `/games/${request.game_id}/notices/${request.id}`,
        request
    );
}

export interface GetGameTeamRequest {
    game_id?: number;
    team_id?: number;
}

export interface CreateGameTeamRequest {
    game_id?: number;
    team_id?: number;
}

export interface UpdateGameTeamRequest {
    game_id?: number;
    team_id?: number;
    is_allowed?: boolean;
}

export interface DeleteGameTeamRequest {
    game_id?: number;
    team_id?: number;
}
