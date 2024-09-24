import { useThemeStore } from "@/stores/theme";
import Sun2BoldDuotone from "~icons/solar/sun-2-bold-duotone";
import MoonBoldDuotone from "~icons/solar/moon-bold-duotone";
import styles from "./Navbar.module.scss";
import useThemeColor from "@/hooks/useThemeColor";
import { CSSProperties } from "react";
import chroma from "chroma-js";

export function Navbar() {
    const darkMode = useThemeStore.getState().darkMode;

    const baseColor = useThemeColor("primary");

    const variables = {
        "--bg-color": chroma(baseColor).hex(),
        "--border-color": chroma(baseColor).hex(),
    } as CSSProperties;

    return (
        <header className={styles["root"]} style={variables}>
            <div className={styles["info"]}>
                <div className={styles["logo"]}>
                    <img src="/cm2.png" alt="icon" draggable={false} />
                </div>
                <h1 className={styles["title"]}>Cloudsdale</h1>
            </div>
            <div className={styles["links"]}>
                {/* <button
                    style={{
                        backgroundColor: "#6556d7",
                        padding: "0.75rem 1.25rem",
                        borderRadius: "0.5rem",
                        fontWeight: "bold",
                        transition: "all ease-in-out 300ms",
                    }}
                >
                    题库|Training Club
                </button>
                <button
                    style={{
                        backgroundColor: "#007bff",
                        padding: "0.75rem 1.25rem",
                        borderRadius: "0.5rem",
                    }}
                >
                    比赛|Races
                </button>
                <button
                    style={{
                        backgroundColor: "#6556d7",
                        padding: "0.75rem 1.25rem",
                        borderRadius: "0.5rem",
                    }}
                >
                    团队|Teams
                </button> */}
            </div>
            <div className={styles["features"]}>
                <button
                    onClick={() => {
                        useThemeStore.getState().setDarkMode(!darkMode);
                    }}
                >
                    {darkMode ? (
                        <>
                            <Sun2BoldDuotone />
                        </>
                    ) : (
                        <>
                            <MoonBoldDuotone />
                        </>
                    )}
                </button>
            </div>
        </header>
    );
}
