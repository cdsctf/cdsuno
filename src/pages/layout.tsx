import { Box } from "@/components/core";
import { Navbar } from "@/components/widgets/Navbar";
import { Outlet, useNavigate } from "react-router";
import styles from "./layout.module.scss";
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
                className={styles["overlay-scrollbars"]}
                options={{
                    scrollbars: {
                        theme: `os-theme-${themeStore?.darkMode ? "light" : "dark"}`,
                        autoHide: "scroll",
                    },
                }}
                defer
            >
                <Box className={styles["root"]}>
                    <Navbar />
                    <Box className={styles["outlet"]}>
                        <Outlet />
                    </Box>
                </Box>
                <Toaster />
            </OverlayScrollbarsComponent>
        </ErrorBoundary>
    );
}
