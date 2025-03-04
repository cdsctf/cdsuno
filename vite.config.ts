import path from "path";
import React from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import viteCompression from "vite-plugin-compression";
import { defineConfig, loadEnv } from "vite";

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
                    configure: (proxy, _options) => {
                        proxy.on("error", (_err, _req, res) => {
                            if (res && !res.headersSent) {
                                res.writeHead(502, {
                                    "Content-Type": "application/json",
                                });
                                res.end(
                                    JSON.stringify({
                                        error: "backend offline",
                                    })
                                );
                            }
                        });
                    },
                },
                "^/api/pods/.+/wsrx": {
                    target: apiUrl.replace("http", "ws"),
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
    };
});
