import { Challenge } from "@/models/challenge";
import { GameTeam } from "@/models/game_team";
import { createContext } from "react";

export const Context = createContext<{
    challenge?: Challenge;
    gameTeam?: GameTeam;
}>({});
