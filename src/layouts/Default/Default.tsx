import { Navbar } from "@/components/widgets/Navbar";
import { Outlet } from "react-router";

export function Default() {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
}
