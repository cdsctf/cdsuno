import { useThemeStore } from "@/stores/theme";
import { RouterProvider } from "react-router";
import { useEffect } from "react";
import { router } from "@/routers";

export default function App() {
    const themeStore = useThemeStore();

    useEffect(() => {
        document.documentElement.setAttribute(
            "data-theme",
            themeStore.darkMode ? "dark" : "light"
        );
    }, [themeStore.darkMode]);

    return <RouterProvider router={router} />;
}
