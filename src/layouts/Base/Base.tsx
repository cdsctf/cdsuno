import { ErrorFallback } from "@/components/utils/ErrorFallback/ErrorFallback";
import { Toaster } from "@/components/widgets/Toaster";
import globalRouter from "@/utils/globalRouter";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet, useNavigate } from "react-router";

export function Base() {
    const navigate = useNavigate();
    globalRouter.navigate = navigate;

    return (
        <>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Outlet />
                <Toaster />
            </ErrorBoundary>
        </>
    );
}
