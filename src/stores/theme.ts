import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ThemeState {
    darkMode: boolean;
    setDarkMode: (darkMode: boolean) => void;
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set) => ({
            darkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
            setDarkMode: (darkMode) => {
                set(() => ({ darkMode }));
            },
        }),
        {
            name: "theme",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
