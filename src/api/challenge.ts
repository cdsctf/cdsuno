import { Challenge, Env } from "@/models/challenge";
import { Metadata } from "@/models/media";
import { Submission } from "@/models/submission";
import { Response } from "@/types";
import { alova } from "@/utils/alova";

export interface GetChallengeRequest {
    id?: string;
    title?: string;
    description?: string;
    category?: number;
    is_public?: boolean;
    is_dynamic?: boolean;
    page?: number;
    size?: number;
    sorts?: string;

    is_desensitized?: boolean;
}

export async function getChallenges(request: GetChallengeRequest) {
    return alova.Get<Response<Array<Challenge>>>("/challenges", {
        params: request,
        cacheFor: 0,
    });
}

export interface GetChallengeStatusRequest {
    challenge_ids: Array<string>;
    user_id?: number;
    team_id?: number;
    game_id?: number;
}

export interface ChallengeStatus {
    is_solved?: boolean;
    solved_times?: number;
    pts?: number;
    bloods?: Array<Submission>;
}

export async function getChallengeStatus(request: GetChallengeStatusRequest) {
    return alova.Post<Response<Record<string, ChallengeStatus>>>(
        "/challenges/status",
        request,
        {
            cacheFor: 0,
        }
    );
}

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
    return alova.Put<Response<Challenge>>(
        `/challenges/${request?.id}`,
        request,
        {
            cacheFor: 0,
        }
    );
}

export interface UpdateChallengeEnvRequest {
    id?: string;
    env?: Env;
}

export async function updateChallengeEnv(request: UpdateChallengeEnvRequest) {
    return alova.Put<Response<never>>(
        `/challenges/${request?.id}/env`,
        request,
        {
            cacheFor: 0,
        }
    );
}

export interface UpdateChallengeCheckerRequest {
    id?: string;
    checker?: string;
}

export async function updateChallengeChecker(
    request: UpdateChallengeCheckerRequest
) {
    return alova.Put<Response<never>>(
        `/challenges/${request?.id}/checker`,
        request,
        {
            cacheFor: 0,
        }
    );
}

export interface CreateChallengeRequest {
    title?: string;
    description?: string;
    category?: number;
    is_public?: boolean;
    is_dynamic?: boolean;
    // env?: Env;
}

export async function createChallenge(request: CreateChallengeRequest) {
    return alova.Post<Response<Challenge>>("/challenges", request, {
        cacheFor: 0,
    });
}

export interface DeleteChallengeRequest {
    id?: string;
}

export async function deleteChallenge(request: DeleteChallengeRequest) {
    return alova.Delete<Response<never>>(`/challenges/${request.id}`);
}

export async function getChallengeAttachmentMetadata(id: string) {
    return alova.Get<Response<Metadata>>(
        `/challenges/${id}/attachment/metadata`
    );
}

export async function deleteChallengeAttachment(id: string) {
    return alova.Delete<Response<never>>(`/challenges/${id}/attachment`);
}
