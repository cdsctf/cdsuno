import { Game } from "./game";
import { Team } from "./team";

export interface GameTeam {
    team_id?: number;
    game_id?: number;
    is_allowed?: boolean;

    rank?: number;
    pts?: number;

    team?: Team;
    game?: Game;
}

export interface GetGameTeamRequest {
    game_id?: number;
    team_id?: number;
    user_id?: number;
}

export interface CreateGameTeamRequest {
    game_id?: number;
    team_id?: number;
}

export interface UpdateGameTeamRequest {
    game_id?: number;
    team_id?: number;
    is_allowed?: boolean;
}

export interface DeleteGameTeamRequest {
    game_id?: number;
    team_id?: number;
}
