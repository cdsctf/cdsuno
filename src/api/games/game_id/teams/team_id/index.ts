import { State, Team } from "@/models/team";
import { Response } from "@/types";
import { alova } from "@/utils/alova";

export interface UpdateTeamRequest {
    id?: number;
    game_id?: number;
    name?: string;
    email?: string;
    slogan?: string;
    description?: string;
}

export async function updateGameTeam(request: UpdateTeamRequest) {
    return alova.Put<Response<Team>>(
        `/games/${request.game_id}/teams/${request.id}`,
        request
    );
}

export interface DeleteTeamRequest {
    id?: number;
    game_id?: number;
}

export async function deleteGameTeam(request: DeleteTeamRequest) {
    return alova.Delete<Response<never>>(
        `/games/${request.game_id}/teams/${request.id}`,
        request
    );
}

export interface SetTeamReadyRequest {
    id?: number;
    game_id?: number;
}

export async function setTeamReady(request: SetTeamReadyRequest) {
    return alova.Post<Response<never>>(
        `/games/${request.game_id}/teams/${request.id}/ready`,
        request
    );
}

export interface UpdateTeamStateRequest {
    id?: number;
    game_id?: number;
    state?: State;
}

export async function updateTeamStateRequest(request: UpdateTeamStateRequest) {
    return alova.Put<Response<never>>(
        `/games/${request.game_id}/teams/${request.id}/state`,
        request
    );
}
