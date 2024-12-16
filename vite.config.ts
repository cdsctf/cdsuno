import { defineConfig, loadEnv } from "vite";
import React from "@vitejs/plugin-react-swc";
import Icons from "unplugin-icons/vite";
import path from "path";
import crypto from "crypto";

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());
    const apiUrl = env.VITE_API_URL || "/api";

    return {
        server: {
            host: "0.0.0.0",
            proxy: {
                "/api": {
                    target: apiUrl,
                    changeOrigin: true,
                },
                "/metrics": {
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
                defaultClass: "iconify",
            }),
        ],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "src"),
            },
        },
        css: {
            modules: {
                generateScopedName: (
                    name: string,
                    filename: string,
                    css: string
                ) => {
                    const shortFilename = filename
                        .replace(/\\/g, "/")
                        .split("/")
                        .pop()!
                        .replace(/(\.\w+)+$/, "");
                    const hash = crypto
                        .createHash("sha256")
                        .update(name.concat(css))
                        .digest("hex")
                        .substring(0, 8);
                    return `cdsuno_${shortFilename}_${name}_${hash}`;
                },
            },
        },
        build: {
            cssCodeSplit: true,
        },
    };
});
