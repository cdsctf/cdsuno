import { User } from "./user";

export interface Team {
    id?: number;
    name?: string;
    slogan?: string;
    description?: string;
    email?: string;
    is_locked?: boolean;
    deleted_at?: string;
    created_at?: string;
    updated_at?: string;
    users?: Array<User>;
}
