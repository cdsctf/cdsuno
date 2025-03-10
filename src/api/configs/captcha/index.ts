import { alova } from "@/utils/alova";
import { Response } from "@/types";

export async function generateCaptcha() {
    return alova.Get<
        Response<{
            id?: string;
            challenge?: string;
        }>
    >("/configs/captcha/generate");
}
