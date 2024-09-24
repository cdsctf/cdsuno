// import { Navbar } from "@/components/widgets/Navbar";
import styles from "./Default.module.scss";
import React from "react";
import { Base } from "@/components/layouts/Base";
import { Sidebar } from "@/components/widgets/Sidebar";

interface DefaultProps {
    children: React.ReactNode;
}

export function Default(props: DefaultProps) {
    const { children } = props;

    return (
        <Base>
            {/* <Navbar /> */}
            <Sidebar />
            <main className={styles["main"]}>{children}</main>
        </Base>
    );
}
