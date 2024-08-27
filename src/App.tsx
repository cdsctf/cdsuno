import Navbar from "@/components/Navbar";
import { useThemeStore } from "@/stores/theme";
import { RouterProvider } from "react-router-dom";
import { router } from "@/routers";
import { useEffect } from "react";
import Toaster from "@/components/Toaster";

function App() {
    const themeStore = useThemeStore();

    useEffect(() => {
        document.documentElement.setAttribute(
            "data-theme",
            themeStore.darkMode ? "dark" : "light"
        );
    }, [themeStore.darkMode]);

    return (
        <>
            <main>
                <Navbar />
                <div
                    style={{
                        marginTop: "62px",
                        overflow: "auto",
                    }}
                >
                    <RouterProvider router={router} />
                </div>
                <Toaster />
            </main>
        </>
    );
}

export default App;
