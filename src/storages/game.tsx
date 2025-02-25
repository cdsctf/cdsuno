import { Game } from "@/models/game";
import { GameTeam } from "@/models/game_team";
import { create } from "zustand";

interface GameState {
    currentGame?: Game;
    setCurrentGame: (game?: Game) => void;

    selfGameTeam?: GameTeam;
    setSelfGameTeam: (gameTeam?: GameTeam) => void;
}

export const useGameStore = create<GameState>()((set, get) => ({
    setCurrentGame: (game) => set({ currentGame: game }),
    setSelfGameTeam: (gameTeam) => set({ selfGameTeam: gameTeam }),
}));
