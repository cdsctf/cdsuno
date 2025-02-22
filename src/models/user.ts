import { Team } from "./team";

export interface User {
    id?: number;
    username?: string;
    nickname?: string;
    email?: string;
    group?: Group;
    description?: string;
    teams?: Array<Team>;
    created_at?: string;
    updated_at?: string;
}

export enum Group {
    Guest = 0,
    Banned = 1,
    User = 2,
    Admin = 3,
}

export interface GetUserRequest {
    id?: number;
    name?: string;
    username?: string;
    email?: string;
    group?: Group;
    page?: number;
    size?: number;
    sorts?: string;
}

export interface UpdateUserRequest {
    id: number;
    username?: string;
    nickname?: string;
    email?: string;
    group?: Group;
    password?: string;
    description?: string;
}

export interface CreateUserRequest {
    username?: string;
    nickname?: string;
    email?: string;
    group?: Group;
    password?: string;
}

export interface DeleteUserRequest {
    id: number;
}

export interface UserLoginRequest {
    account: string;
    password: string;
    captcha?: {
        id?: string;
        content?: string;
    };
}

export interface UserRegisterRequest {
    username: string;
    nickname: string;
    email: string;
    password: string;
    captcha?: {
        id?: string;
        content?: string;
    };
}

export interface UpdateUserProfileRequest {
    nickname?: string;
    email?: string;
    password?: string;
    description?: string;
}

export interface UpdateUserProfilePasswordRequest {
    old_password: string;
    new_password: string;
}
