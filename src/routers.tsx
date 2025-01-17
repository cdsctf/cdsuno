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
                path: "about",
                children: [
                    {
                        index: true,
                        lazy: async () => {
                            let { Index } = await import("@/pages/about");
                            return { Component: Index };
                        },
                    },
                    {
                        path: "playground",
                        lazy: async () => {
                            let { Index } = await import(
                                "@/pages/about/playground"
                            );
                            return { Component: Index };
                        },
                    },
                ],
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
                                    let { Layout } = await import(
                                        "@/pages/settings/challenges/[id]/layout"
                                    );
                                    return { Component: Layout };
                                },
                                children: [
                                    {
                                        index: true,
                                        lazy: async () => {
                                            let { Index } = await import(
                                                "@/pages/settings/challenges/[id]"
                                            );
                                            return { Component: Index };
                                        },
                                    },
                                    {
                                        path: "flags",
                                        lazy: async () => {
                                            let { Index } = await import(
                                                "@/pages/settings/challenges/[id]/flags"
                                            );
                                            return { Component: Index };
                                        },
                                    },
                                    {
                                        path: "pods",
                                        lazy: async () => {
                                            let { Index } = await import(
                                                "@/pages/settings/challenges/[id]/pods"
                                            );
                                            return { Component: Index };
                                        },
                                    },
                                    {
                                        path: "attachments",
                                        lazy: async () => {
                                            let { Index } = await import(
                                                "@/pages/settings/challenges/[id]/attachments"
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
        ],
    },
]);
