import { GameTeam } from "./game_team";
import { GameSubmission, Status } from "./submission";

export interface Game {
    id?: number;
    title?: string;
    sketch?: string;
    description?: string;
    is_enabled?: boolean;
    is_public?: boolean;
    is_need_write_up?: boolean;

    member_limit_min?: number;
    member_limit_max?: number;

    started_at?: number;
    frozen_at?: number;
    ended_at?: number;

    created_at?: number;
    updated_at?: number;
}

export interface ScoreRecord {
    game_team?: GameTeam;
    submissions?: Array<GameSubmission>;
}
