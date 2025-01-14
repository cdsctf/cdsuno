import { useThemeStore } from "@/stores/theme";
import { RouterProvider } from "react-router";
import { useEffect } from "react";
import { router } from "@/routers";
import { useSharedStore } from "./stores/shared";
import { get } from "./api/config";

export default function App() {
    const themeStore = useThemeStore();
    const sharedStore = useSharedStore();

    function fetchConfigs() {
        get().then((res) => {
            sharedStore.setConfig(res.data);
        });
    }

    useEffect(() => {
        document.documentElement.setAttribute(
            "data-theme",
            themeStore.darkMode ? "dark" : "light"
        );
    }, [themeStore.darkMode]);

    useEffect(() => {
        fetchConfigs();
    }, []);

    return <RouterProvider router={router} />;
}
