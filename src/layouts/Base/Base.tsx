import { ErrorFallback } from "@/components/utils/ErrorFallback/ErrorFallback";
import { Toaster } from "@/components/widgets/Toaster";
import { useTooltipStore } from "@/stores/tooltip";
import globalRouter from "@/utils/globalRouter";
import { useEffect, useRef } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet, useNavigate } from "react-router";
import styles from "./Base.module.scss";

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
                <main className={styles["root"]} ref={ref}>
                    <Outlet />
                </main>
                <Toaster />
            </ErrorBoundary>
        </>
    );
}
