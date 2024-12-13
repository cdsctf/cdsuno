import { Navbar } from "@/components/widgets/Navbar";
import styles from "./Default.module.scss";
import { Outlet } from "react-router";
import { Box } from "@/components/core";

export function Default() {
    return (
        <>
            <main className={styles["main"]}>
                <Navbar />
                <Box className={styles["outlet"]}>
                    <Outlet />
                </Box>
            </main>
        </>
    );
}
