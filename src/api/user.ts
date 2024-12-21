import { User, UserLoginRequest } from "@/models/user";
import { Response } from "@/types";
import { alovaInstance } from "@/utils/alova";

export async function login(request: UserLoginRequest) {
    return alovaInstance.Post<Response<User>>("/users/login", request);
}
