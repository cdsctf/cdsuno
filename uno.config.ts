import {
    defineConfig,
    presetUno,
    presetTypography,
    presetWebFonts,
} from "unocss";
import transformerVariantGroup from "@unocss/transformer-variant-group";
import transformerDirectives from "@unocss/transformer-directives";
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
    transformers: [transformerVariantGroup(), transformerDirectives()],
    shortcuts: {
        stack: "flex flex-col",
    },
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
    rules: [],
});
