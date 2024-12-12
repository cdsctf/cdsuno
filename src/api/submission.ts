import { Submission, SubmissionCreateRequest } from "@/models/submission";
import { Result } from "@/types";
import { alovaInstance } from "@/utils/alova";

export async function post(request: SubmissionCreateRequest) {
    return alovaInstance.Post<Result<Submission>>("/submissions", request);
}

export async function getByID(id: number) {
    return alovaInstance.Get<Result<Submission>>(`/submissions/${id}`, {
        cacheFor: 0,
    });
}
