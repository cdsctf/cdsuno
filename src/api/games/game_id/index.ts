import { Game, ScoreRecord } from "@/models/game";
import { alova } from "@/utils/alova";
import { Response } from "@/types";
import { Metadata } from "@/models/media";

export interface GetGameScoreboardRequest {
    id?: number;
    size?: number;
    page?: number;
}

export async function getGameScoreboard(request: GetGameScoreboardRequest) {
    return alova.Get<Response<Array<ScoreRecord>>>(
        `/games/${request.id}/scoreboard`,
        {
            params: request,
            cacheFor: 30 * 1000,
        }
    );
}

export interface UpdateGameRequest {
    id?: number;
    title?: string;
    sketch?: string;
    description?: string;
    is_enabled?: boolean;
    is_public?: boolean;
    is_need_write_up?: boolean;
    member_limit_min?: number;
    member_limit_max?: number;
    started_at?: number;
    frozen_at?: number;
    ended_at?: number;
}

export async function updateGame(request: UpdateGameRequest) {
    return alova.Put<Response<Game>>(`/games/${request.id}`, request);
}

export interface DeleteGameRequest {
    id?: number;
}

export async function deleteGame(request: DeleteGameRequest) {
    return alova.Delete<Response<never>>(`/games/${request.id}`);
}

export async function getGamePosterMetadata(id: number) {
    return alova.Get<Response<Metadata>>(`/games/${id}/poster/metadata`);
}

export async function deleteGamePoster(id: number) {
    return alova.Delete<Response<never>>(`/games/${id}/poster`);
}

export async function getGameIconMetadata(id: number) {
    return alova.Get<Response<Metadata>>(`/games/${id}/icon/metadata`);
}

export async function deleteGameIcon(id: number) {
    return alova.Delete<Response<never>>(`/games/${id}/icon`);
}
