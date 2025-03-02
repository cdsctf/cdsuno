import { Team } from "@/models/team";
import { Response } from "@/types";
import { alova } from "@/utils/alova";

export interface GetTeamRequest {
    id?: number;
    game_id?: number;
    user_id?: number;
}

export async function getTeams(request: GetTeamRequest) {
    return alova.Get<Response<Array<Team>>>(`/games/${request.game_id}/teams`, {
        params: request,
    });
}

export interface CreateTeamRequest {
    game_id?: number;
    name?: string;
    email?: string;
    slogan?: string;
    description?: string;
}

export async function createTeam(request: CreateTeamRequest) {
    return alova.Post<Response<Team>>(
        `/games/${request.game_id}/teams`,
        request
    );
}

export interface TeamRegisterRequest {
    game_id?: number;
    name?: string;
    email?: string;
    slogan?: string;
    description?: string;
}

export async function team_register(request: TeamRegisterRequest) {
    return alova.Post<Response<Team>>(
        `/games/${request.game_id}/teams/register`,
        request
    );
}
