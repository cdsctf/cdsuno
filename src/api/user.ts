import { Metadata } from "@/models/media";
import {
    User,
    CreateUserRequest,
    DeleteUserRequest,
    GetUserRequest,
    UserLoginRequest,
    UpdateUserRequest,
    UpdateUserProfileRequest,
    UpdateUserProfilePasswordRequest,
    UserRegisterRequest,
} from "@/models/user";
import { Response } from "@/types";
import { alova } from "@/utils/alova";

export async function getUsers(request: GetUserRequest) {
    return alova.Get<Response<Array<User>>>("/users", {
        params: request,
    });
}

export async function createUser(request: CreateUserRequest) {
    return alova.Post<Response<User>>("/users", request);
}

export async function deleteUser(request: DeleteUserRequest) {
    return alova.Delete<Response<never>>(`/users/${request.id}`, request);
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

export async function login(request: UserLoginRequest) {
    return alova.Post<Response<User>>("/users/login", request);
}

export async function logout() {
    return alova.Post<Response<never>>("/users/logout");
}

export async function register(request: UserRegisterRequest) {
    return alova.Post<Response<User>>("/users/register", request);
}

export async function updateUserProfile(request: UpdateUserProfileRequest) {
    return alova.Put<Response<User>>("/users/profile", request);
}

export async function updateUserProfilePassword(
    request: UpdateUserProfilePasswordRequest
) {
    return alova.Put<Response<never>>("/users/profile/password", request);
}
