import { Flex } from "@/components/core";
import { Sidebar } from "./_blocks/Sidebar";
import { Outlet } from "react-router";

export function Layout() {
    return (
        <Flex>
            <Sidebar />
            <Outlet />
        </Flex>
    );
}
