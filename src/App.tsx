import { RouterProvider } from "react-router";
import routers from "@/routers";
import { Toaster } from "@/components/ui/sonner";
import { useEffect } from "react";
import { useThemeStore } from "@/storages/theme";
import { useConfigStore } from "@/storages/config";
import { getConfigs } from "@/api/config";
import { cn } from "./utils";
import { ScrollArea } from "./components/ui/scroll-area";

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
        <>
            <Toaster />
            <ScrollArea
                className={cn([
                    "relative",
                    "w-screen",
                    "h-screen",
                    "m-0",
                    "overflow-auto",
                ])}
            >
                <RouterProvider router={routers} />
            </ScrollArea>
        </>
    );
}

export default App;
