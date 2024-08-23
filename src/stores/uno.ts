import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UnoState {
    darkMode: boolean;
    setDarkMode: (darkMode: boolean) => void;
}

export const useUnoStore = create<UnoState>()(
    persist(
        (set) => ({
            darkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
            setDarkMode: (darkMode) => set(() => ({ darkMode })),
        }),
        {
            name: "uno",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
