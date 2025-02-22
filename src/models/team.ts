import { User } from "./user";

export interface Team {
    id?: number;
    name?: string;
    slogan?: string;
    description?: string;
    email?: string;
    is_locked?: boolean;
    deleted_at?: string;
    created_at?: string;
    updated_at?: string;
    users?: Array<User>;
}

export interface GetTeamRequest {
    id?: number;
    name?: string;
    user_id?: number;
    page?: number;
    size?: number;
    sorts?: string;
}

export interface UpdateTeamRequest {
    id?: number;
    name?: string;
    slogan?: string;
    description?: string;
    email?: string;
    password?: string;
}

export interface CreateTeamRequest {
    name?: string;
    slogan?: string;
    email?: string;
    password?: string;
}

export interface RegisterTeamRequest {
    name?: string;
    email?: string;
    password?: string;
}

export interface DeleteTeamRequest {
    id: number;
}

export interface TeamJoinRequest {
    user_id?: number;
    team_id: number;
    password: string;
}

export interface TeamQuitRequest {
    id: number;
}

export interface TeamGetInviteTokenRequest {
    id: number;
}

export interface TeamUpdateInviteTokenRequest {
    id: number;
}

export interface DeleteTeamUserRequest {
    team_id: number;
    user_id: number;
}

export interface CreateTeamUserRequest {
    team_id: number;
    user_id: number;
}
