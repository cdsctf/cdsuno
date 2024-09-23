import { useThemeStore } from "@/stores/theme";
import { RouterProvider } from "react-router-dom";
import { router } from "@/routers";
import { useEffect } from "react";
import Toaster from "@/components/Toaster";
import { Sidebar } from "@/components/widgets/Sidebar";

export default function App() {
    const themeStore = useThemeStore();

    useEffect(() => {
        document.documentElement.setAttribute(
            "data-theme",
            themeStore.darkMode ? "dark" : "light"
        );
    }, [themeStore.darkMode]);

    return (
        <>
            <Sidebar />
            <main>
                <RouterProvider router={router} />
            </main>
            <Toaster />
        </>
    );
}
