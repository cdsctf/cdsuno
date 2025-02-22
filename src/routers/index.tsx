import { createBrowserRouter } from "react-router";

export default createBrowserRouter([
    {
        path: "/",
        lazy: async () => {
            return { Component: (await import("@/pages/layout")).default };
        },
        children: [
            {
                index: true,
                lazy: async () => {
                    return {
                        Component: (await import("@/pages")).default,
                    };
                },
            },
            {
                path: "playground",
                lazy: async () => {
                    return {
                        Component: (await import("@/pages/playground")).default,
                    };
                },
            },
        ],
    },
]);
