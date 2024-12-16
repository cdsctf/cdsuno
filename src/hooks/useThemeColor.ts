import { useThemeStore } from "@/stores/theme";
import { useMemo } from "react";

export default function useThemeColor(baseColor: string) {
    const themeStore = useThemeStore();

    return useMemo(() => {
        let color = baseColor;

        color = getComputedStyle(document.documentElement)
            .getPropertyValue(`--color-${baseColor}`)
            .trim();

        if (color) {
            return `var(--color-${baseColor})`;
        }

        return baseColor;
    }, [themeStore.darkMode, baseColor]);
}
