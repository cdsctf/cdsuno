import { Config } from "@/models/config";
import { create } from "zustand";

interface SharedState {
    refresh: number;
    setRefresh: () => void;

    config?: Config;
    setConfig: (config?: Config) => void;
}

export const useSharedStore = create<SharedState>()((set, get) => ({
    refresh: 0,
    setRefresh: () => set({ refresh: get().refresh + 1 }),

    config: undefined,
    setConfig: (config) => set({ config }),
}));
