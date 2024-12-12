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
                    let { Login } = await import("@/pages/Login");
                    return { Component: Login };
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
                            let { Default } = await import("@/pages/Default");
                            return { Component: Default };
                        },
                    },
                    {
                        path: "games",
                        lazy: async () => {
                            let { Default } = await import(
                                "@/pages/_games/Default"
                            );
                            return { Component: Default };
                        },
                    },
                    {
                        path: "challenges",
                        lazy: async () => {
                            let { Challenges } = await import(
                                "@/pages/Challenges"
                            );
                            return { Component: Challenges };
                        },
                    },
                    {
                        path: "settings",
                        children: [
                            {
                                index: true,
                                lazy: async () => {
                                    let { Default } = await import(
                                        "@/pages/_settings/Default"
                                    );
                                    return { Component: Default };
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
                            let { Default } = await import(
                                "@/pages/_games/_[id]/Default"
                            );
                            return { Component: Default };
                        },
                    },
                ],
            },
        ],
    },
]);
