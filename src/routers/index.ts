import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: "/",
        lazy: async () => {
            let page = await import("@/pages/index");
            return { Component: page.default };
        },
    },
]);
