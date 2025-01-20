import { Box } from "@/components/core";
import { Navbar } from "@/components/widgets/Navbar";
import { Outlet, useNavigate } from "react-router";
import { useThemeStore } from "@/stores/theme";
import globalRouter from "@/utils/globalRouter";
import { Toaster } from "@/components/widgets/Toaster";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@/components/utils/ErrorFallback";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/overlayscrollbars.css";

export function Layout() {
    const themeStore = useThemeStore();

    const navigate = useNavigate();
    globalRouter.navigate = navigate;

    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <OverlayScrollbarsComponent
                className={"relative w-screen h-screen m-0 overflow-auto"}
                options={{
                    scrollbars: {
                        theme: `os-theme-${themeStore?.darkMode ? "light" : "dark"}`,
                        autoHide: "scroll",
                    },
                }}
                defer
            >
                <Box className={"min-h-screen min-w-fit flex flex-col"}>
                    <Navbar />
                    <Box className={"flex flex-1 flex-col"}>
                        <Outlet />
                    </Box>
                </Box>
                <Toaster />
            </OverlayScrollbarsComponent>
        </ErrorBoundary>
    );
}
