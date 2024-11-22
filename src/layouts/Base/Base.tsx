import { Toaster } from "@/components/widgets/Toaster";
import globalRouter from "@/utils/globalRouter";
import { Outlet, useNavigate } from "react-router-dom";

export function Base() {
    const navigate = useNavigate();
    globalRouter.navigate = navigate;

    return (
        <>
            <Outlet />
            <Toaster />
        </>
    );
}
