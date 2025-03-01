import { Team } from "@/models/team";
import { alova } from "@/utils/alova";
import { Response } from "@/types";
import { Metadata } from "@/models/media";

export interface GetTeamRequest {
    id?: number;
    name?: string;
    user_id?: number;
    page?: number;
    size?: number;
    sorts?: string;
}

export async function getTeams(request: GetTeamRequest) {
    return alova.Get<Response<Array<Team>>>("/teams", {
        params: request,
    });
}

export interface CreateTeamRequest {
    name?: string;
    slogan?: string;
    email?: string;
    password?: string;
}

export async function createTeam(request: CreateTeamRequest) {
    return alova.Post<Response<Team>>("/teams", request);
}

export interface RegisterTeamRequest {
    name?: string;
    email?: string;
    password?: string;
}

export async function registerTeam(request: RegisterTeamRequest) {
    return alova.Post<Response<Team>>("/teams/register", request);
}

export interface DeleteTeamRequest {
    id: number;
}

export async function deleteTeam(request: DeleteTeamRequest) {
    return alova.Delete<Response<never>>(`/teams/${request.id}`, request);
}

export interface UpdateTeamRequest {
    id?: number;
    name?: string;
    slogan?: string;
    description?: string;
    email?: string;
    password?: string;
}

export async function updateTeam(request: UpdateTeamRequest) {
    return alova.Put<Response<Team>>(`/teams/${request.id}`, request);
}

export async function getTeamAvatarMetadata(id: number) {
    return alova.Get<Response<Metadata>>(`/teams/${id}/avatar/metadata`);
}

export async function deleteTeamAvatar(id: number) {
    return alova.Delete<Response<never>>(`/teams/${id}/avatar`);
}

export interface CreateTeamUserRequest {
    team_id: number;
    user_id: number;
}

export async function createTeamUser(request: CreateTeamUserRequest) {
    return alova.Post<Response<never>>(
        `/teams/${request.team_id}/users`,
        request
    );
}

export interface DeleteTeamUserRequest {
    team_id: number;
    user_id: number;
}

export async function deleteTeamUser(request: DeleteTeamUserRequest) {
    return alova.Delete<Response<never>>(
        `/teams/${request.team_id}/users/${request.user_id}`,
        request
    );
}

export interface TeamJoinRequest {
    user_id?: number;
    team_id: number;
    password: string;
}

export async function joinTeam(request: TeamJoinRequest) {
    return alova.Post<Response<never>>(
        `/teams/${request.team_id}/join`,
        request
    );
}

export async function quitTeam() {}
