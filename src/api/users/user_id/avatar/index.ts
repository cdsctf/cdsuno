import { Metadata } from "@/models/media";
import { Response } from "@/types";
import { alova } from "@/utils/alova";

export async function getUserAvatarMetadata(id: number) {
    return alova.Get<Response<Metadata>>(`/users/${id}/avatar/metadata`);
}

interface DeleteUserAvatarRequest {
    user_id: number;
}

export async function deleteUserAvatar(request: DeleteUserAvatarRequest) {
    return alova.Delete<Response<never>>(`/users/${request.user_id}/avatar`);
}
