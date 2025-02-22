import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface ConfigState {
    config?: {
        meta?: {
            title?: string;
            description?: string;
            keywords?: string;
        };
        captcha?: {
            provider?: "none" | "pow" | "image" | "turnstile" | "hcaptcha";
            turnstile?: {
                site_key?: string;
            };
            hcaptcha?: {
                site_key?: string;
            };
        };
    };
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
