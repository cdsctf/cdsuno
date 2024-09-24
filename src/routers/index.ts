import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: "/",
        lazy: async () => {
            let { Page } = await import("@/pages/index");
            return { Component: Page };
        },
    },
    {
        path: "/login",
        lazy: async () => {
            let { Page } = await import("@/pages/login");
            return { Component: Page };
        },
    },
    {
        path: "/games",
        children: [
            {
                index: true,
                lazy: async () => {
                    let { Page } = await import("@/pages/_games");
                    return { Component: Page };
                },
            },
            {
                path: ":id",
                lazy: async () => {
                    let { Page } = await import("@/pages/_games/_[id]");
                    return { Component: Page };
                },
            },
        ],
    },
]);
