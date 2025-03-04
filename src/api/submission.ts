import { Submission } from "@/models/submission";
import { Response } from "@/types";
import { alova } from "@/utils/alova";

export interface CreateSubmissionRequest {
    content?: string;
    challenge_id?: string;
    team_id?: number;
    game_id?: number;
}

export async function postSubmission(request: CreateSubmissionRequest) {
    return alova.Post<Response<Submission>>("/submissions", request);
}

export interface GetSubmissionRequest {
    id?: number;
    content?: string;
    status?: number;
    user_id?: number;
    is_detailed?: boolean;
    challenge_id?: string;
    team_id?: number;
    game_id?: number;
    size?: number;
    page?: number;

    is_desensitized?: boolean;
}

export async function getSubmission(request: GetSubmissionRequest) {
    return alova.Get<Response<Array<Submission>>>(`/submissions`, {
        params: request,
        cacheFor: 0,
    });
}

export interface DeleteSubmissionRequest {
    id?: number;
}
