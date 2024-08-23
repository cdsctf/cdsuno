import { defineConfig } from "vite";
import UnoCSS from "unocss/vite";
import React from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [UnoCSS(), React()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
});
