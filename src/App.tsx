import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import { useUnoStore } from "@/stores/uno";
import { RouterProvider } from "react-router-dom";
import { router } from "@/routers";

function App() {
    const unoStore = useUnoStore();

    useEffect(() => {
        const htmlElement = document.documentElement;
        if (unoStore.darkMode) {
            htmlElement.classList.add("dark");
        } else {
            htmlElement.classList.remove("dark");
        }
    }, [unoStore.darkMode]);

    return (
        <>
            <main
                bg="light-5 dark:gray-5"
                h="screen"
                transition="colors"
                className="duration-300 ease-in-out"
            >
                <Navbar />
                <div
                    className="mx-16 p-4"
                    flex="inline"
                    gap="10"
                    align="center"
                    style={{
                        position: "fixed",
                        top: "4rem",
                    }}
                >
                    <RouterProvider router={router} />
                </div>
            </main>
        </>
    );
}

export default App;
