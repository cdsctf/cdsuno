import path from "path";
import React from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import viteCompression from "vite-plugin-compression";
import { execSync } from "child_process";
import { defineConfig } from "vite";

const commitHash = execSync("git rev-parse --short HEAD").toString().trim();

export default defineConfig(({}) => {
    return {
        server: {
            host: "0.0.0.0",
            proxy: {
                "/api": {
                    target:
                        process.env.VITE_DEV_API || "https://127.0.0.1:8888",
                    changeOrigin: true,
                    ws: true,
                },
            },
        },
        plugins: [React(), tailwindcss(), viteCompression()],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
            },
        },
        assetsInclude: ["**/*.cdsx"],
        define: {
            "import.meta.env.VITE_COMMIT_HASH": JSON.stringify(commitHash),
        },
    };
});
