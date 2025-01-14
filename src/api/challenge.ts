import {
    Challenge,
    ChallengeGetRequest,
    ChallengeStatus,
    ChallengeStatusRequest,
    ChallengeUpdateRequest,
} from "@/models/challenge";
import { Response } from "@/types";
import { alovaInstance } from "@/utils/alova";

export async function get(request: ChallengeGetRequest) {
    return alovaInstance.Get<Response<Array<Challenge>>>("/challenges", {
        params: request,
    });
}

export async function getStatus(request: ChallengeStatusRequest) {
    return alovaInstance.Post<Response<Record<number, ChallengeStatus>>>(
        "/challenges/status",
        request,
        {
            cacheFor: 0,
        }
    );
}

export async function update(request: ChallengeUpdateRequest) {
    return alovaInstance.Put<Response<Challenge>>(
        `/challenges/${request?.id}`,
        request,
        {
            cacheFor: 0,
        }
    );
}
