import { defineConfig } from "vite";
import React from "@vitejs/plugin-react-swc";
import Icons from "unplugin-icons/vite";
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
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
});
