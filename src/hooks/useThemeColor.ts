import { useThemeStore } from "@/stores/theme";
import chroma from "chroma-js";
import { useMemo } from "react";

export default function useThemeColor(baseColor: string) {
    const themeStore = useThemeStore();

    const hexRegex: RegExp = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

    return useMemo(() => {
        let color = "";

        if (hexRegex.test(baseColor)) {
            color = baseColor;
        } else {
            color = getComputedStyle(document.documentElement)
                .getPropertyValue(`--color-${baseColor}`)
                .trim();

            if (color) {
                return `var(--color-${baseColor})`;
            }
        }

        if (themeStore.darkMode && chroma.valid(color)) {
            color = chroma(color).desaturate(0.5).hex();
        }

        return color;
    }, [themeStore.darkMode, baseColor]);
}
