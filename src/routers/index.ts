import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: "/",
        lazy: async () => {
            let { Base } = await import("@/layouts/Base");
            return { Component: Base };
        },
        children: [
            {
                path: "login",
                lazy: async () => {
                    let { Page } = await import("@/pages/login");
                    return { Component: Page };
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
                            let { Page } = await import("@/pages/index");
                            return { Component: Page };
                        },
                    },
                    {
                        path: "games",
                        lazy: async () => {
                            let { Page } = await import("@/pages/_games");
                            return { Component: Page };
                        },
                    },
                ],
            },
            {
                path: "games",
                children: [
                    {
                        path: ":id",
                        lazy: async () => {
                            let { Page } = await import("@/pages/_games/_[id]");
                            return { Component: Page };
                        },
                    },
                ],
            },
        ],
    },
]);
