import { createBrowserRouter } from "react-router";

export default createBrowserRouter([
    {
        path: "/",
        lazy: async () => ({
            Component: (await import("@/pages/layout")).default,
        }),
        children: [
            {
                index: true,
                lazy: async () => ({
                    Component: (await import("@/pages")).default,
                }),
            },
            {
                path: "playground",
                lazy: async () => ({
                    Component: (await import("@/pages/playground")).default,
                }),
            },
            {
                path: "games",
                children: [
                    {
                        index: true,
                        lazy: async () => ({
                            Component: (await import("@/pages/games")).default,
                        }),
                    },
                    {
                        path: ":game_id",
                        lazy: async () => ({
                            Component: (
                                await import("@/pages/games/[game_id]/layout")
                            ).default,
                        }),
                        children: [
                            {
                                index: true,
                                lazy: async () => ({
                                    Component: (
                                        await import("@/pages/games/[game_id]")
                                    ).default,
                                }),
                            },
                        ],
                    },
                ],
            },
            {
                path: "account",
                children: [
                    {
                        path: "login",
                        lazy: async () => ({
                            Component: (await import("@/pages/account/login"))
                                .default,
                        }),
                    },
                ],
            },
            {
                path: "admin",
                children: [
                    {
                        index: true,
                        lazy: async () => ({
                            Component: (await import("@/pages/admin")).default,
                        }),
                    },
                    {
                        path: "challenges",
                        children: [
                            {
                                index: true,
                                lazy: async () => ({
                                    Component: (
                                        await import("@/pages/admin/challenges")
                                    ).default,
                                }),
                            },
                        ],
                    },
                    {
                        path: "games",
                        children: [
                            {
                                index: true,
                                lazy: async () => ({
                                    Component: (
                                        await import("@/pages/admin/games")
                                    ).default,
                                }),
                            },
                        ],
                    },
                    {
                        path: "teams",
                        children: [
                            {
                                index: true,
                                lazy: async () => ({
                                    Component: (
                                        await import("@/pages/admin/teams")
                                    ).default,
                                }),
                            },
                        ],
                    },
                    {
                        path: "users",
                        children: [
                            {
                                index: true,
                                lazy: async () => ({
                                    Component: (
                                        await import("@/pages/admin/users")
                                    ).default,
                                }),
                            },
                        ],
                    },
                ],
            },
        ],
    },
]);
