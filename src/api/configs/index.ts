import { alova } from "@/utils/alova";
import { Response } from "@/types";
import { Config } from "@/models/config";

interface GetConfigReuqest {
    is_desensitized: boolean;
}

export async function getConfigs(request: GetConfigReuqest) {
    return alova.Get<Response<Config>>("/configs", {
        params: request,
    });
}

export async function updateConfig(request: Config) {
    return alova.Put<Response<Config>>("/configs", request);
}
