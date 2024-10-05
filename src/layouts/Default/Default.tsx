import { Navbar } from "@/components/widgets/Navbar";
import styles from "./Default.module.scss";
import { Outlet } from "react-router-dom";

export function Default() {
    return (
        <>
            <Navbar />
            <main className={styles["main"]}>
                <Outlet />
            </main>
        </>
    );
}
