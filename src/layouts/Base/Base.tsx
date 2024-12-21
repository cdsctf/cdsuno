import { ErrorFallback } from "@/components/utils/ErrorFallback/ErrorFallback";
import { Toaster } from "@/components/widgets/Toaster";
import { useTooltipStore } from "@/stores/tooltip";
import globalRouter from "@/utils/globalRouter";
import { useEffect, useRef } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet, useNavigate } from "react-router";
import styles from "./Base.module.scss";
import { Box } from "@/components/core";
import { useThemeStore } from "@/stores/theme";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/overlayscrollbars.css";

export function Base() {
    const themeStore = useThemeStore();

    const navigate = useNavigate();
    globalRouter.navigate = navigate;

    const tooltipStore = useTooltipStore();
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current) {
            tooltipStore.setPortal(ref.current);
        }
    }, [ref.current]);

    return (
        <>
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
                    <Box className={styles["root"]} ref={ref}>
                        <Outlet />
                    </Box>
                    <Toaster />
                </OverlayScrollbarsComponent>
            </ErrorBoundary>
        </>
    );
}
