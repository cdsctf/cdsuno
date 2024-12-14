import { Box } from "@/components/core";
import { Navbar } from "@/components/widgets/Navbar";
import { Outlet } from "react-router";
import styles from "./Default.module.scss";

export function Default() {
    return (
        <Box className={styles["root"]}>
            <Navbar />
            <Box className={styles["outlet"]}>
                <Outlet />
            </Box>
        </Box>
    );
}
