import { Game, ScoreRecord } from "@/models/game";
import { GameChallenge } from "@/models/game_challenge";
import { GameNotice } from "@/models/game_notice";
import { GameTeam } from "@/models/game_team";
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

export interface GetGameScoreboardRequest {
    size?: number;
    page?: number;
}

export async function getGameScoreboard(
    id: number,
    request: GetGameScoreboardRequest
) {
    return alova.Get<Response<Array<ScoreRecord>>>(`/games/${id}/scoreboard`, {
        params: request,
        cacheFor: 30 * 1000,
    });
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

export interface UpdateGameChallengeRequest {
    game_id?: number;
    challenge_id?: string;
    is_enabled?: boolean;
    max_pts?: number;
    min_pts?: number;
    difficulty?: number;
    bonus_ratios?: Array<number>;
    frozen_at?: number | null;
}

export async function updateGameChallenge(request: UpdateGameChallengeRequest) {
    return alova.Put<Response<GameChallenge>>(
        `/games/${request.game_id}/challenges/${request.challenge_id}`,
        request
    );
}

export interface DeleteGameChallengeRequest {
    challenge_id?: string;
    game_id?: number;
}

export async function deleteGameChallenge(request: DeleteGameChallengeRequest) {
    return alova.Delete<Response<never>>(
        `/games/${request.game_id}/challenges/${request.challenge_id}`,
        request
    );
}

export interface GetGameTeamRequest {
    game_id?: number;
    team_id?: number;
    user_id?: number;
}

export async function getGameTeams(request: GetGameTeamRequest) {
    return alova.Get<Response<Array<GameTeam>>>(
        `/games/${request.game_id}/teams`,
        {
            params: request,
        }
    );
}

export interface CreateGameTeamRequest {
    game_id?: number;
    team_id?: number;
}

export async function createGameTeam(request: CreateGameTeamRequest) {
    return alova.Post<Response<GameTeam>>(
        `/games/${request.game_id}/teams`,
        request
    );
}

export interface UpdateGameTeamRequest {
    game_id?: number;
    team_id?: number;
    is_allowed?: boolean;
}

export async function updateGameTeam(request: UpdateGameTeamRequest) {
    return alova.Put<Response<GameTeam>>(
        `/games/${request.game_id}/teams/${request.team_id}`,
        request
    );
}

export interface DeleteGameTeamRequest {
    game_id?: number;
    team_id?: number;
}

export async function deleteGameTeam(request: DeleteGameTeamRequest) {
    return alova.Delete<Response<never>>(
        `/games/${request.game_id}/challenges/${request.team_id}`,
        request
    );
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
