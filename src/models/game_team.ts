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
