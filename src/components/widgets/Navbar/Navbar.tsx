import { useThemeStore } from "@/stores/theme";
import Sun2BoldDuotone from "~icons/solar/sun-2-bold-duotone";
import MoonBoldDuotone from "~icons/solar/moon-bold-duotone";
import Book2BoldDuotone from "~icons/solar/book-2-bold-duotone";
import FlagBoldDuotone from "~icons/solar/flag-bold-duotone";
import UsersGroupTwoRoundedBoldDuotone from "~icons/solar/users-group-two-rounded-bold-duotone";
import PlanetBoldDuotone from "~icons/solar/planet-bold-duotone";
import styles from "./Navbar.module.scss";
import useThemeColor from "@/hooks/useThemeColor";
import { CSSProperties } from "react";
import chroma from "chroma-js";
import { Link, useLocation } from "react-router-dom";

export function Navbar() {
    const darkMode = useThemeStore.getState().darkMode;
    const pathname = useLocation().pathname;

    const baseColor = useThemeColor("primary");

    const variables = {
        "--bg-color": chroma(baseColor).hex(),
        "--border-color": chroma(baseColor).hex(),
    } as CSSProperties;

    const links = [
        {
            icon: <PlanetBoldDuotone />,
            label: "主页",
            href: "/",
        },
        {
            icon: <Book2BoldDuotone />,
            label: "题库",
            href: "/challenges",
        },
        {
            icon: <FlagBoldDuotone />,
            label: "比赛",
            href: "/games",
        },
        {
            icon: <UsersGroupTwoRoundedBoldDuotone />,
            label: "团队",
            href: "/teams",
        },
    ];

    return (
        <header className={styles["root"]} style={variables}>
            <div className={styles["left-section"]}>
                <div className={styles["info-wrapper"]}>
                    <Link to={"/"} draggable={false}>
                        <div className={styles["info"]}>
                            <div className={styles["logo"]}>
                                <img
                                    src="/cm2.png"
                                    alt="icon"
                                    draggable={false}
                                />
                            </div>
                            <h1 className={styles["title"]}>Cloudsdale</h1>
                        </div>
                    </Link>
                </div>
            </div>
            <div className={styles["links"]}>
                {links.map((item) => (
                    <Link to={item?.href} key={item?.href} draggable={false}>
                        <div
                            className={styles["link"]}
                            data-active={pathname === item?.href}
                        >
                            <div className={styles["icon"]}>{item?.icon}</div>
                            <div className={styles["label"]}>{item?.label}</div>
                        </div>
                    </Link>
                ))}
            </div>
            <div className={styles["right-section"]}>
                <div className={styles["features-wrapper"]}>
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
                </div>
            </div>
        </header>
    );
}
