import { RouterProvider } from "react-router";
import routers from "@/routers";
import { Toaster } from "@/components/ui/sonner";
import { useEffect } from "react";
import { useThemeStore } from "@/storages/theme";
import { useConfigStore } from "@/storages/config";
import { getConfigs } from "@/api/config";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { cn } from "./utils";

function App() {
    const { theme } = useThemeStore();
    const configStore = useConfigStore();

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        if (theme === "system") {
            const systemTheme = window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches
                ? "dark"
                : "light";

            root.classList.add(systemTheme);
            return;
        }

        root.classList.add(theme);
    }, [theme]);

    function fetchConfigs() {
        getConfigs().then((res) => {
            configStore.setConfig(res.data);
        });
    }

    useEffect(() => {
        fetchConfigs();
    }, []);

    return (
        <OverlayScrollbarsComponent
            className={cn([
                "relative",
                "w-screen",
                "h-screen",
                "m-0",
                "overflow-auto",
            ])}
            options={{
                scrollbars: {
                    theme: `os-theme-${theme === "dark" ? "light" : "dark"}`,
                    autoHide: "scroll",
                },
            }}
            defer
        >
            <Toaster />
            <RouterProvider router={routers} />
        </OverlayScrollbarsComponent>
    );
}

export default App;
