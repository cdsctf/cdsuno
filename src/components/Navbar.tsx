import { useThemeStore } from "@/stores/theme";
import Sun2BoldDuotone from "~icons/solar/sun-2-bold-duotone";
import MoonBoldDuotone from "~icons/solar/moon-bold-duotone";

export default function Navbar() {
    const darkMode = useThemeStore.getState().darkMode;

    return (
        <div
            style={{
                height: "4rem",
                width: "100%",
                zIndex: 2,
                padding: "0 2rem",
                display: "flex",
                flexDirection: "row",
                borderBottom: "2px solid #37464f",
                alignItems: "center",
                justifyContent: "space-between",
                position: "fixed",
            }}
        >
            <div style={{ width: "50%" }}></div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    flexShrink: 0,
                    gap: "0.75rem",
                }}
            >
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
                        backgroundColor: "#007bff", // primary-1
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
            <div
                style={{
                    width: "50%",
                    display: "flex",
                    justifyContent: "flex-end",
                }}
            >
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
