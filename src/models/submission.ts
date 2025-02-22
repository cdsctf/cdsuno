import { Game } from "./game";
import { Team } from "./team";
import { Challenge } from "./challenge";
import { User } from "./user";

export interface Submission {
    id?: number;
    content?: string;
    status?: Status;
    user_id?: number;
    user?: User;
    challenge_id?: string;
    challenge?: Challenge;
    team_id?: number;
    team?: Team;
    game_id?: number;
    game?: Game;
    created_at?: number;
    updated_at?: number;
}

export interface GameSubmission extends Submission {
    pts?: number;
    rank?: number;
}

export enum Status {
    Pending = 0,
    Correct = 1,
    Incorrect = 2,
    Cheat = 3,
    Invalid = 4,
}

export interface CreateSubmissionRequest {
    content?: string;
    challenge_id?: string;
    team_id?: number;
    game_id?: number;
}

export interface GetSubmissionRequest {
    id?: number;
    content?: string;
    status?: number;
    user_id?: number;
    is_detailed?: boolean;
    challenge_id?: string;
    team_id?: number;
    game_id?: number;
    size?: number;
    page?: number;

    is_desensitized?: boolean;
}

export interface DeleteSubmissionRequest {
    id?: number;
}
