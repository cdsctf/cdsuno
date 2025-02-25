import { GameTeam } from "@/models/game_team";
import { createContext } from "react";

export const Context = createContext<{
    gtLoaded?: boolean;
}>({});
