import type { Config } from "tailwindcss";

export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
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
    plugins: [],
} satisfies Config;
