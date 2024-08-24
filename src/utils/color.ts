import { useThemeStore } from "@/stores/theme";
import chroma from "chroma-js";

export function getColor(color: string) {
    if (color.startsWith("#")) {
        if (useThemeStore.getState().darkMode) {
            return chroma(color).darken(1).hex() as string;
        }
        return color;
    }

    const regex = /^[a-zA-Z]+-[0-9]+$/;

    if (!regex.test(color)) {
        return `var(--color-${color}-5)`;
    }

    return `var(--color-${color})`;
}
