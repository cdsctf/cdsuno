import { defineConfig, loadEnv } from "vite";
import React from "@vitejs/plugin-react-swc";
import Icons from "unplugin-icons/vite";
import { prismjsPlugin } from "vite-plugin-prismjs";
import path from "path";

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());
    const apiUrl = env.VITE_API_URL || "/api";

    return {
        server: {
            proxy: {
                "/api": {
                    target: apiUrl,
                    changeOrigin: true,
                },
                "/api/proxies": {
                    target: apiUrl.replace("http", "ws"),
                    ws: true,
                },
            },
        },
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
    };
});
