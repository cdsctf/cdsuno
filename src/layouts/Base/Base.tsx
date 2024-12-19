import { ErrorFallback } from "@/components/utils/ErrorFallback/ErrorFallback";
import { Toaster } from "@/components/widgets/Toaster";
import { useTooltipStore } from "@/stores/tooltip";
import globalRouter from "@/utils/globalRouter";
import { useEffect, useRef } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet, useNavigate } from "react-router";
import styles from "./Base.module.scss";
import { Box } from "@/components/core";

export function Base() {
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
                <Box className={styles["root"]} ref={ref}>
                    <Outlet />
                </Box>
                <Toaster />
            </ErrorBoundary>
        </>
    );
}
