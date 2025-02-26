import { Navbar } from "@/components/widgets/navbar";
import { Outlet, useNavigate } from "react-router";
import globalRouter from "@/utils/global-router";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { cn } from "@/utils";
import { useThemeStore } from "@/storages/theme";
import "overlayscrollbars/overlayscrollbars.css";

export default function () {
    const navigate = useNavigate();
    globalRouter.navigate = navigate;

    const { theme } = useThemeStore();

    return (
        <OverlayScrollbarsComponent
            className={"relative w-screen h-screen m-0 overflow-auto"}
            options={{
                scrollbars: {
                    theme: `os-theme-${theme === "dark" ? "light" : "dark"}`,
                    autoHide: "scroll",
                },
            }}
            defer
        >
            <div>
                <Navbar />
                <main
                    className={cn([
                        "flex",
                        "flex-col",
                        "min-h-[calc(100vh-64px)]",
                    ])}
                >
                    <Outlet />
                </main>
            </div>
        </OverlayScrollbarsComponent>
    );
}
