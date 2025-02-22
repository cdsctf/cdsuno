import { Env } from "./env";
import { Submission } from "./submission";

export interface Challenge {
    id?: string;
    title?: string;
    tags?: Array<string>;
    description?: string;
    category?: number;
    has_attachment?: boolean;
    is_public?: boolean;
    is_dynamic?: boolean;
    env?: Env;
    checker?: string;
    updated_at?: number;
    created_at?: number;
}

export interface GetChallengeRequest {
    id?: string;
    title?: string;
    description?: string;
    category?: number;
    is_public?: boolean;
    is_dynamic?: boolean;
    page?: number;
    size?: number;
    sorts?: string;

    is_desensitized?: boolean;
}

export interface UpdateChallengeRequest {
    id?: string;
    title?: string;
    tags?: Array<string>;
    description?: string;
    category?: number;
    has_attachment?: boolean;
    is_public?: boolean;
    is_dynamic?: boolean;
}

export interface UpdateChallengeCheckerRequest {
    id?: string;
    checker?: string;
}

export interface UpdateChallengeEnvRequest {
    id?: string;
    env?: Env;
}

export interface CreateChallengeRequest {
    title?: string;
    description?: string;
    category?: number;
    is_public?: boolean;
    is_dynamic?: boolean;
    env?: Env;
}

export interface DeleteChallengeRequest {
    id?: string;
}

export interface ChallengeStatus {
    is_solved?: boolean;
    solved_times?: number;
    pts?: number;
    bloods?: Array<Submission>;
}

export interface GetChallengeStatusRequest {
    challenge_ids: Array<string>;
    user_id?: number;
    team_id?: number;
    game_id?: number;
}
