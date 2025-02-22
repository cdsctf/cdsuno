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
        ],
    },
]);
