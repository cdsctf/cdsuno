import { Env } from "@/models/env";
import { alova } from "@/utils/alova";
import { Response } from "@/types";

export interface GetEnvRequest {
    id?: string;
    game_id?: number;
    user_id?: number;
    team_id?: number;
    challenge_id?: string;
}

export async function getEnvs(request: GetEnvRequest) {
    return alova.Get<Response<Array<Env>>>("/envs", {
        params: request,
    });
}

export interface CreateEnvRequest {
    game_id?: number;
    team_id?: number;
    challenge_id?: string;
}

export async function createEnv(request: CreateEnvRequest) {
    return alova.Post<Response<Env>>("/envs", request, {
        timeout: 0,
    });
}

export interface StopEnvRequest {
    id: string;
}

export async function stopEnv(request: StopEnvRequest) {
    return alova.Post<Response<unknown>>(`/envs/${request.id}/stop`, request);
}

export interface RenewEnvRequest {
    id: string;
    team_id?: number;
    game_id?: number;
}

export async function renewEnv(request: RenewEnvRequest) {
    return alova.Post<Response<Env>>(`/envs/${request.id}/renew`, request);
}
