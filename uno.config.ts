import {
    defineConfig,
    presetUno,
    presetTypography,
    presetWebFonts,
} from "unocss";
import transformerVariantGroup from "@unocss/transformer-variant-group";
import presetIcons from "@unocss/preset-icons";

export default defineConfig({
    presets: [
        presetUno({
            dark: "class",
        }),
        presetTypography(),
        presetIcons({
            extraProperties: {
                display: "inline-block",
                "vertical-align": "middle",
                height: "100%",
                width: "100%",
            },
        }),
        presetWebFonts({
            provider: "none",
            fonts: {
                sans: "ubuntu",
                mono: "ubuntu",
                lato: "ubuntu",
            },
        }),
    ],
    transformers: [transformerVariantGroup()],
    theme: {
        colors: {
            red: "var(--color-red)",
            pink: "var(--color-pink)",
            grape: "var(--color-grape)",
            violet: "var(--color-violet)",
            indigo: "var(--color-indigo)",
            blue: "var(--color-blue)",
            cyan: "var(--color-cyan)",
            teal: "var(--color-teal)",
            green: "var(--color-green)",
            lime: "var(--color-lime)",
            yellow: "var(--color-yellow)",
            orange: "var(--color-orange)",
            dark: "var(--color-dark)",
            gray: "var(--color-gray)",
            light: "var(--color-light)",
            primary: "var(--color-primary)",
            secondary: "var(--color-secondary)",
            info: "var(--color-info)",
            success: "var(--color-success)",
            warning: "var(--color-warning)",
            error: "var(--color-error)",
        },
        boxShadow: {
            none: "var(--shadow-none)",
            sm: "var(--shadow-sm)",
            md: "var(--shadow-md)",
            lg: "var(--shadow-lg)",
            xl: "var(--shadow-xl)",
        },
    },
    rules: [
        // Custom theme rules for light mode
        [
            "[data-theme=light]",
            {
                "color-scheme": "light",
                "--bg-color": "var(--color-light)",
                "--bg-2nd-color": "#f2f2f2",
                "--text-color": "var(--color-dark)",
            },
        ],
        // Custom theme rules for dark mode
        [
            "[data-theme=dark]",
            {
                "color-scheme": "dark",
                "--bg-color": "var(--color-dark)",
                "--bg-2nd-color": "#1f2a2f",
                "--text-color": "var(--color-light)",
            },
        ],
    ],
});
