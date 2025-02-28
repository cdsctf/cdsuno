import {
    Challenge,
    CreateChallengeRequest,
    GetChallengeRequest,
    ChallengeStatus,
    GetChallengeStatusRequest,
    UpdateChallengeRequest,
    DeleteChallengeRequest,
    UpdateChallengeCheckerRequest,
    UpdateChallengeEnvRequest,
} from "@/models/challenge";
import { Metadata } from "@/models/media";
import { Response } from "@/types";
import { alova } from "@/utils/alova";

export async function getChallenges(request: GetChallengeRequest) {
    return alova.Get<Response<Array<Challenge>>>("/challenges", {
        params: request,
        cacheFor: 0,
    });
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

export async function updateChallenge(request: UpdateChallengeRequest) {
    return alova.Put<Response<Challenge>>(
        `/challenges/${request?.id}`,
        request,
        {
            cacheFor: 0,
        }
    );
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

export async function createChallenge(request: CreateChallengeRequest) {
    return alova.Post<Response<Challenge>>("/challenges", request, {
        cacheFor: 0,
    });
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
