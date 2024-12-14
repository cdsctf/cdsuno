import { create } from "zustand";

interface TooltipState {
    portal?: HTMLDivElement;
    setPortal: (el: HTMLDivElement) => void;
}

export const useTooltipStore = create<TooltipState>()((set) => ({
    porta: undefined,
    setPortal: (el) => set({ portal: el }),
}));
