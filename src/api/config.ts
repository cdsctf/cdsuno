import { alovaInstance } from "@/utils/alova";
import { Response } from "@/types";
import { Config } from "@/models/config";

export async function get() {
    return alovaInstance.Get<Response<Config>>("/configs");
}
