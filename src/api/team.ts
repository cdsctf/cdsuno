import {
    Team,
    CreateTeamRequest,
    CreateTeamUserRequest,
    DeleteTeamRequest,
    DeleteTeamUserRequest,
    GetTeamRequest,
    TeamJoinRequest,
    RegisterTeamRequest,
    UpdateTeamRequest,
} from "@/models/team";
import { alova } from "@/utils/alova";
import { Response } from "@/types";
import { Metadata } from "@/models/media";

export async function getTeams(request: GetTeamRequest) {
    return alova.Get<Response<Array<Team>>>("/teams", {
        params: request,
    });
}

export async function createTeam(request: CreateTeamRequest) {
    return alova.Post<Response<Team>>("/teams", request);
}

export async function registerTeam(request: RegisterTeamRequest) {
    return alova.Post<Response<Team>>("/teams/register", request);
}

export async function deleteTeam(request: DeleteTeamRequest) {
    return alova.Delete<Response<never>>(`/teams/${request.id}`, request);
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

export async function createTeamUser(request: CreateTeamUserRequest) {
    return alova.Post<Response<never>>(
        `/teams/${request.team_id}/users`,
        request
    );
}

export async function deleteTeamUser(request: DeleteTeamUserRequest) {
    return alova.Delete<Response<never>>(
        `/teams/${request.team_id}/users/${request.user_id}`,
        request
    );
}

export async function joinTeam(request: TeamJoinRequest) {
    return alova.Post<Response<never>>(
        `/teams/${request.team_id}/join`,
        request
    );
}

export async function quitTeam() {}
