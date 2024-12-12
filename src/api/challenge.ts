import {
    Challenge,
    ChallengeGetRequest,
    ChallengeStatus,
    ChallengeStatusRequest,
} from "@/models/challenge";
import { Result } from "@/types";
import { alovaInstance } from "@/utils/alova";

export async function get(request: ChallengeGetRequest) {
    return alovaInstance.Get<Result<Array<Challenge>>>("/challenges", {
        params: request,
    });
}

export async function getStatus(request: ChallengeStatusRequest) {
    return alovaInstance.Post<Result<Record<number, ChallengeStatus>>>(
        "/challenges/status",
        request,
        {
            cacheFor: 10 * 1000,
        }
    );
}
