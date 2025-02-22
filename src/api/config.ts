import { alova } from "@/utils/alova";
import { Response } from "@/types";
import { ConfigState } from "@/storages/config";

export async function getConfigs() {
    return alova.Get<Response<ConfigState["config"]>>("/configs");
}

export async function getCaptcha() {
    return alova.Get<
        Response<{
            id?: string;
            challenge?: string;
        }>
    >("/configs/captcha");
}
