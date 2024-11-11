import { User, UserLoginRequest } from "@/models/user";
import { Result } from "@/types";
import { alovaInstance } from "@/utils/alova";

export async function login(request: UserLoginRequest) {
    return alovaInstance.Post<Result<User>>("/users/login", request);
}
