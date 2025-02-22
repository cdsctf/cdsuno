import {
    Submission,
    CreateSubmissionRequest,
    GetSubmissionRequest,
} from "@/models/submission";
import { Response } from "@/types";
import { alova } from "@/utils/alova";

export async function postSubmission(request: CreateSubmissionRequest) {
    return alova.Post<Response<Submission>>("/submissions", request);
}

export async function getSubmission(request: GetSubmissionRequest) {
    return alova.Get<Response<Array<Submission>>>(`/submissions`, {
        params: request,
        cacheFor: 0,
    });
}
