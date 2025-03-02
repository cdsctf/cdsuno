import { User } from "./user";

export interface Team {
    id?: number;
    game_id?: number;
    name?: string;
    email?: string;
    slogan?: string;
    description?: string;
    is_allowed?: boolean;

    pts?: number;
    rank?: number;

    deleted_at?: number;

    users?: Array<User>;
}
