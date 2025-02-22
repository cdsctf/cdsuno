import {
    Pod,
    CreatePodRequest as CreatePodRequest,
    GetPodRequest as GetPodRequest,
    RemovePodRequest as RemovePodRequest,
    RenewPodRequest as RenewPodRequest,
} from "@/models/pod";
import { alova } from "@/utils/alova";
import { Response } from "@/types";

export async function getPods(request: GetPodRequest) {
    return alova.Get<Response<Array<Pod>>>("/pods", {
        params: request,
    });
}

export async function createPod(request: CreatePodRequest) {
    return alova.Post<Response<Pod>>("/pods", request, {
        timeout: 0,
    });
}

export async function stopPod(request: RemovePodRequest) {
    return alova.Post<Response<unknown>>(`/pods/${request.id}/stop`, request);
}

export async function renewPod(request: RenewPodRequest) {
    return alova.Post<Response<Pod>>(`/pods/${request.id}/renew`, request);
}
