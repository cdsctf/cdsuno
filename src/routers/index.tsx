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
                                await import("@/pages/games/game_id/layout")
                            ).default,
                        }),
                        children: [
                            {
                                index: true,
                                lazy: async () => ({
                                    Component: (
                                        await import("@/pages/games/game_id")
                                    ).default,
                                }),
                            },
                            {
                                path: "team",
                                lazy: async () => ({
                                    Component: (
                                        await import(
                                            "@/pages/games/game_id/team/layout"
                                        )
                                    ).default,
                                }),
                                children: [
                                    {
                                        index: true,
                                        lazy: async () => ({
                                            Component: (
                                                await import(
                                                    "@/pages/games/game_id/team"
                                                )
                                            ).default,
                                        }),
                                    },
                                    {
                                        path: "members",
                                        lazy: async () => ({
                                            Component: (
                                                await import(
                                                    "@/pages/games/game_id/team/members"
                                                )
                                            ).default,
                                        }),
                                    },
                                ],
                            },
                            {
                                path: "challenges",
                                lazy: async () => ({
                                    Component: (
                                        await import(
                                            "@/pages/games/game_id/challenges"
                                        )
                                    ).default,
                                }),
                            },
                            {
                                path: "scoreboard",
                                lazy: async () => ({
                                    Component: (
                                        await import(
                                            "@/pages/games/game_id/scoreboard"
                                        )
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
                    {
                        path: "register",
                        lazy: async () => ({
                            Component: (
                                await import("@/pages/account/register")
                            ).default,
                        }),
                    },
                    {
                        path: "settings",
                        lazy: async () => ({
                            Component: (
                                await import("@/pages/account/settings/layout")
                            ).default,
                        }),
                        children: [
                            {
                                index: true,
                                lazy: async () => ({
                                    Component: (
                                        await import("@/pages/account/settings")
                                    ).default,
                                }),
                            },
                            {
                                path: "password",
                                lazy: async () => ({
                                    Component: (
                                        await import(
                                            "@/pages/account/settings/password"
                                        )
                                    ).default,
                                }),
                            },
                            {
                                path: "delete",
                                lazy: async () => ({
                                    Component: (
                                        await import(
                                            "@/pages/account/settings/delete"
                                        )
                                    ).default,
                                }),
                            },
                        ],
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
                            {
                                path: ":challenge_id",
                                lazy: async () => ({
                                    Component: (
                                        await import(
                                            "@/pages/admin/challenges/challenge_id/layout"
                                        )
                                    ).default,
                                }),
                                children: [
                                    {
                                        index: true,
                                        lazy: async () => ({
                                            Component: (
                                                await import(
                                                    "@/pages/admin/challenges/challenge_id"
                                                )
                                            ).default,
                                        }),
                                    },
                                    {
                                        path: "checker",
                                        lazy: async () => ({
                                            Component: (
                                                await import(
                                                    "@/pages/admin/challenges/challenge_id/checker"
                                                )
                                            ).default,
                                        }),
                                    },
                                    {
                                        path: "attachments",
                                        lazy: async () => ({
                                            Component: (
                                                await import(
                                                    "@/pages/admin/challenges/challenge_id/attachments"
                                                )
                                            ).default,
                                        }),
                                    },
                                    {
                                        path: "env",
                                        lazy: async () => ({
                                            Component: (
                                                await import(
                                                    "@/pages/admin/challenges/challenge_id/env"
                                                )
                                            ).default,
                                        }),
                                    },
                                    {
                                        path: "statistics",
                                        lazy: async () => ({
                                            Component: (
                                                await import(
                                                    "@/pages/admin/challenges/challenge_id/statistics"
                                                )
                                            ).default,
                                        }),
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        path: "envs",
                        children: [
                            {
                                index: true,
                                lazy: async () => ({
                                    Component: (
                                        await import("@/pages/admin/envs")
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
            {
                path: "about",
                lazy: async () => ({
                    Component: (await import("@/pages/about")).default,
                }),
            },
            {
                path: "*",
                lazy: async () => ({
                    Component: (await import("@/pages/sigtrap/e404")).default,
                }),
            },
        ],
    },
]);
