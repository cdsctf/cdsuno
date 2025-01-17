import { Flag } from "./flag";
import { Hint } from "./hint";
import { Env } from "./env";
import { Submission } from "./submission";

export interface Challenge {
    id?: number;
    title?: string;
    description?: string;
    category?: number;
    has_attachment?: boolean;
    is_public?: boolean;
    is_dynamic?: boolean;
    duration?: number;
    image_name?: string;
    memory_limit?: number;
    cpu_limit?: number;
    ports?: Array<number>;
    envs?: Array<Env>;
    flags?: Array<Flag>;
    hints?: Array<Hint>;
    updated_at?: string;
}

export interface ChallengeGetRequest {
    id?: number;
    title?: string;
    description?: string;
    category?: number;
    is_public?: boolean;
    is_dynamic?: boolean;
    is_detailed?: boolean;
    difficulty?: number;
    page?: number;
    size?: number;
    sorts?: string;
}

export interface ChallengeUpdateRequest {
    id?: number;
    title?: string;
    description?: string;
    category?: number;
    has_attachment?: boolean;
    is_public?: boolean;
    is_dynamic?: boolean;
    duration?: number;
    image_name?: string;
    memory_limit?: number;
    cpu_limit?: number;
    ports?: Array<number>;
    envs?: Array<Env>;
    flags?: Array<Flag>;
}

export interface ChallengeCreateRequest {
    title?: string;
    description?: string;
    category?: number;
    is_public?: boolean;
    is_dynamic?: boolean;
    duration?: number;
    image_name?: string;
    memory_limit?: number;
    cpu_limit?: number;
    ports?: Array<number>;
    envs?: Array<Env>;
}

export interface ChallengeDeleteRequest {
    id?: number;
}

export interface ChallengeStatus {
    is_solved?: boolean;
    solved_times?: number;
    pts?: number;
    bloods?: Array<Submission>;
}

export interface ChallengeStatusRequest {
    challenge_ids: Array<number>;
    user_id?: number;
    team_id?: number;
    game_id?: number;
}
