import { Toaster } from "@/components/widgets/Toaster";
import { Outlet } from "react-router-dom";

export function Base() {
    return (
        <>
            <Outlet />
            <Toaster />
        </>
    );
}
