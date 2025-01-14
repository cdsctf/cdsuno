import { Config } from "@/models/config";
import { create } from "zustand";

interface SharedState {
    refresh: number;
    setRefresh: () => void;

    portal?: HTMLDivElement;
    setPortal: (el: HTMLDivElement) => void;

    config?: Config;
    setConfig: (config?: Config) => void;
}

export const useSharedStore = create<SharedState>()((set, get) => ({
    refresh: 0,
    setRefresh: () => set({ refresh: get().refresh + 1 }),

    portal: undefined,
    setPortal: (el) => set({ portal: el }),

    config: undefined,
    setConfig: (config) => set({ config }),
}));
