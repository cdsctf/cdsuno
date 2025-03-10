import { Config } from "@/models/config";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface ConfigState {
    config?: Config;
    setConfig: (config: ConfigState["config"]) => void;
}

export const useConfigStore = create<ConfigState>()(
    persist(
        (set, _get) => ({
            setConfig: (config) => set({ config }),
        }),
        {
            name: "config",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
