import { alova } from "@/utils/alova";
import { Response } from "@/types";

export async function deleteLogo() {
    return alova.Delete<Response<never>>("/configs/logo");
}
