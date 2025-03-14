import { Challenge, Env } from "@/models/challenge";
import { WebResponse } from "@/types";
import { alova } from "@/utils/alova";

export interface UpdateChallengeRequest {
    id?: string;
    title?: string;
    tags?: Array<string>;
    description?: string;
    category?: number;
    has_attachment?: boolean;
    is_public?: boolean;
    is_dynamic?: boolean;
}

export async function updateChallenge(request: UpdateChallengeRequest) {
    return alova.Put<WebResponse<Challenge>>(
        `/admin/challenges/${request?.id}`,
        request,
        {
            cacheFor: 0,
        }
    );
}

export interface DeleteChallengeRequest {
    id?: string;
}

export async function deleteChallenge(request: DeleteChallengeRequest) {
    return alova.Delete<WebResponse<never>>(`/admin/challenges/${request.id}`);
}
