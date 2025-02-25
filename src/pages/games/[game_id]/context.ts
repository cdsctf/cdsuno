import { Game } from "@/models/game";
import { GameTeam } from "@/models/game_team";
import { createContext } from "react";

export const Context = createContext<{
    game?: Game;
    selfGameTeam?: GameTeam;
    gtLoaded?: boolean;
}>({});
