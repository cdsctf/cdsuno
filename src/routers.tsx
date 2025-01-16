import { createBrowserRouter } from "react-router";
import { HydrateFallback } from "@/components/utils/HydrateFallback";

export const router = createBrowserRouter([
    {
        hydrateFallbackElement: <HydrateFallback />,
        path: "/",
        lazy: async () => {
            let { Layout } = await import("@/pages/layout");
            return { Component: Layout };
        },
        children: [
            {
                index: true,
                lazy: async () => {
                    let { Index } = await import("@/pages");
                    return { Component: Index };
                },
            },
            {
                path: "login",
                lazy: async () => {
                    let { Index } = await import("@/pages/login");
                    return { Component: Index };
                },
            },
            {
                path: "games",
                children: [
                    {
                        index: true,
                        lazy: async () => {
                            let { Index } = await import("@/pages/games");
                            return { Component: Index };
                        },
                    },
                    {
                        path: ":id",
                        lazy: async () => {
                            let { Index } = await import("@/pages/games/[id]");
                            return { Component: Index };
                        },
                    },
                ],
            },
            {
                path: "challenges",
                lazy: async () => {
                    let { Index } = await import("@/pages/challenges");
                    return { Component: Index };
                },
            },
            {
                path: "settings",
                children: [
                    {
                        index: true,
                        lazy: async () => {
                            let { Index } = await import("@/pages/settings");
                            return { Component: Index };
                        },
                    },
                    {
                        path: "challenges",
                        children: [
                            {
                                index: true,
                                lazy: async () => {
                                    let { Index } = await import(
                                        "@/pages/settings/challenges"
                                    );
                                    return { Component: Index };
                                },
                            },
                            {
                                path: ":id",
                                lazy: async () => {
                                    let { Index } = await import(
                                        "@/pages/settings/challenges/[id]"
                                    );
                                    return { Component: Index };
                                },
                            },
                        ],
                    },
                ],
            },
        ],
    },
]);
