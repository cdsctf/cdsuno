import { Submission, SubmissionCreateRequest } from "@/models/submission";
import { Response } from "@/types";
import { alovaInstance } from "@/utils/alova";

export async function post(request: SubmissionCreateRequest) {
    return alovaInstance.Post<Response<Submission>>("/submissions", request);
}

export async function getByID(id: number) {
    return alovaInstance.Get<Response<Submission>>(`/submissions/${id}`, {
        cacheFor: 0,
    });
}
