import { Group, User } from "@/models/user";
import { Response } from "@/types";
import { alova } from "@/utils/alova";

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
