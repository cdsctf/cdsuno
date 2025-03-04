import { Metadata } from "@/models/media";
import { Group, User } from "@/models/user";
import { Response } from "@/types";
import { alova } from "@/utils/alova";

export interface UpdateUserProfileRequest {
    nickname?: string;
    email?: string;
    description?: string | null;
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
