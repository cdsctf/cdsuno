import { Response } from "@/types";
import { alova } from "@/utils/alova";

export interface CreateTeamUserRequest {
    team_id?: number;
    game_id?: number;
    user_id?: number;
}

export async function createTeamUser(request: CreateTeamUserRequest) {
    return alova.Post<Response<never>>(
        `/games/${request.game_id}/teams/${request.team_id}/users`,
        request
    );
}

export interface DeleteTeamUserRequest {
    team_id?: number;
    game_id?: number;
    user_id?: number;
}

export async function deleteTeamUser(request: DeleteTeamUserRequest) {
    return alova.Delete<Response<never>>(
        `/games/${request.game_id}/teams/${request.team_id}/users/${request.user_id}`,
        request
    );
}

export interface JoinTeamRequest {
    game_id?: number;
    team_id?: number;
    token?: string;
}

export async function joinTeam(request: JoinTeamRequest) {
    return alova.Post<Response<never>>(
        `/games/${request?.game_id}/teams/${request?.team_id}/join`,
        request
    );
}
