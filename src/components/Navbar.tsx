import { useThemeStore } from "@/stores/theme";
import Sun2BoldDuotone from "~icons/solar/sun-2-bold-duotone";
import MoonBoldDuotone from "~icons/solar/moon-bold-duotone";
import styles from "@/styles/components/Navbar.module.scss";

export default function Navbar() {
    const darkMode = useThemeStore.getState().darkMode;

    return (
        <div className={styles["root"]}>
            <div className={styles["logo"]}></div>
            <div className={styles["links"]}>
                <button
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
                </button>
            </div>
            <div className={styles["features"]}>
                <button
                    onClick={() => {
                        useThemeStore.getState().setDarkMode(!darkMode);
                    }}
                >
                    {darkMode ? (
                        <>
                            <Sun2BoldDuotone style={{ color: "#333" }} />
                        </>
                    ) : (
                        <>
                            <MoonBoldDuotone
                                style={{
                                    color: "#339af0",
                                }}
                            />
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
