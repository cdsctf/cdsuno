import { defineConfig } from "vite";
import React from "@vitejs/plugin-react-swc";
import Icons from "unplugin-icons/vite";
import { prismjsPlugin } from "vite-plugin-prismjs";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        React(),
        Icons({
            compiler: "jsx",
            jsx: "react",
            scale: 1.2,
            defaultStyle: "width: fit-content; height: 100%;",
        }),
        prismjsPlugin({
            languages: "all",
            css: true,
        }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
});
