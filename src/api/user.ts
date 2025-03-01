import { Metadata } from "@/models/media";
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

export interface DeleteUserRequest {
    id: number;
}

export async function deleteUser(request: DeleteUserRequest) {
    return alova.Delete<Response<never>>(`/users/${request.id}`, request);
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

export async function updateUser(request: UpdateUserRequest) {
    return alova.Put<Response<User>>(`/users/${request.id}`, request);
}

export async function getUserAvatarMetadata(id: number) {
    return alova.Get<Response<Metadata>>(`/users/${id}/avatar/metadata`);
}

export async function deleteUserAvatar(id: number) {
    return alova.Delete<Response<never>>(`/users/${id}/avatar`);
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

export interface UpdateUserProfileRequest {
    nickname?: string;
    email?: string;
    password?: string;
    description?: string;
}

export async function updateUserProfile(request: UpdateUserProfileRequest) {
    return alova.Put<Response<User>>("/users/profile", request);
}

export interface UpdateUserProfilePasswordRequest {
    old_password: string;
    new_password: string;
}

export async function updateUserProfilePassword(
    request: UpdateUserProfilePasswordRequest
) {
    return alova.Put<Response<never>>("/users/profile/password", request);
}
