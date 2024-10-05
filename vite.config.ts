import { defineConfig } from "vite";
import React from "@vitejs/plugin-react-swc";
import Icons from "unplugin-icons/vite";
import { prismjsPlugin } from "vite-plugin-prismjs";
import path from "path";

export default defineConfig(({ mode }) => {
    return {
        server: {
            proxy: {
                "/api": {
                    target:
                        mode === "development"
                            ? "http://localhost:8888"
                            : "/api",
                    changeOrigin: true,
                },
                "/api/proxies": {
                    target:
                        mode === "development"
                            ? "ws://localhost:8888"
                            : "/api/proxies",
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
