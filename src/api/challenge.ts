import {
    Challenge,
    ChallengeCreateRequest,
    ChallengeGetRequest,
    ChallengeStatus,
    ChallengeStatusRequest,
    ChallengeUpdateRequest,
    ChallengeDeleteRequest,
} from "@/models/challenge";
import { Response } from "@/types";
import { alovaInstance } from "@/utils/alova";

export async function getChallenges(request: ChallengeGetRequest) {
    return alovaInstance.Get<Response<Array<Challenge>>>("/challenges", {
        params: request,
    });
}

export async function getChallengeStatus(request: ChallengeStatusRequest) {
    return alovaInstance.Post<Response<Record<number, ChallengeStatus>>>(
        "/challenges/status",
        request,
        {
            cacheFor: 0,
        }
    );
}

export async function updateChallenge(request: ChallengeUpdateRequest) {
    return alovaInstance.Put<Response<Challenge>>(
        `/challenges/${request?.id}`,
        request,
        {
            cacheFor: 0,
        }
    );
}

export async function createChallenge(request: ChallengeCreateRequest) {
    return alovaInstance.Post<Response<Challenge>>("/challenges", request, {
        cacheFor: 0,
    });
}

export async function deleteChallenge(request: ChallengeDeleteRequest) {
    return alovaInstance.Delete<Response<never>>(`/challenges/${request.id}`, {
        cacheFor: 0,
    });
}
