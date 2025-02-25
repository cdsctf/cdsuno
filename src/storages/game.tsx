import { Game } from "@/models/game";
import { create } from "zustand";

interface GameState {
    currentGame?: Game;
    setCurrentGame: (game?: Game) => void;
}

export const useGameStore = create<GameState>()((set, get) => ({
    setCurrentGame: (game) => set({ currentGame: game }),
}));
