import { Group, User } from "@/models/user";
import { Response } from "@/types";
import { alova } from "@/utils/alova";

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

export async function getUsers(request: GetUserRequest) {
    return alova.Get<Response<Array<User>>>("/users", {
        params: request,
    });
}

export interface CreateUserRequest {
    username?: string;
    nickname?: string;
    email?: string;
    group?: Group;
    password?: string;
}

export async function createUser(request: CreateUserRequest) {
    return alova.Post<Response<User>>("/users", request);
}

export interface UserLoginRequest {
    account: string;
    password: string;
    captcha?: {
        id?: string;
        content?: string;
    };
}

export async function login(request: UserLoginRequest) {
    return alova.Post<Response<User>>("/users/login", request);
}

export async function logout() {
    return alova.Post<Response<never>>("/users/logout");
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

export async function register(request: UserRegisterRequest) {
    return alova.Post<Response<User>>("/users/register", request);
}
