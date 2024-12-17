import { createBrowserRouter } from "react-router";
import { HydrateFallback } from "@/components/utils/HydrateFallback";

export const router = createBrowserRouter([
    {
        hydrateFallbackElement: <HydrateFallback />,
        path: "/",
        lazy: async () => {
            let { Base } = await import("@/layouts/Base");
            return { Component: Base };
        },
        children: [
            {
                path: "login",
                lazy: async () => {
                    let { Index } = await import("@/pages/login");
                    return { Component: Index };
                },
            },
            {
                path: "/",
                lazy: async () => {
                    let { Default } = await import("@/layouts/Default");
                    return { Component: Default };
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
                        path: "games",
                        lazy: async () => {
                            let { Index } = await import("@/pages/games");
                            return { Component: Index };
                        },
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
                                    let { Index } = await import(
                                        "@/pages/settings"
                                    );
                                    return { Component: Index };
                                },
                            },
                        ],
                    },
                ],
            },
            {
                path: "games",
                children: [
                    {
                        path: ":id",
                        lazy: async () => {
                            let { Index } = await import("@/pages/games/[id]");
                            return { Component: Index };
                        },
                    },
                ],
            },
        ],
    },
]);
