import { useThemeStore } from "@/stores/theme";
import Sun2BoldDuotone from "~icons/solar/sun-2-bold-duotone";
import MoonBoldDuotone from "~icons/solar/moon-bold-duotone";
import Book2BoldDuotone from "~icons/solar/book-2-bold-duotone";
import FlagBoldDuotone from "~icons/solar/flag-bold-duotone";
import UsersGroupTwoRoundedBoldDuotone from "~icons/solar/users-group-two-rounded-bold-duotone";
import PlanetBoldDuotone from "~icons/solar/planet-bold-duotone";
import styles from "./Navbar.module.scss";
import useThemeColor from "@/hooks/useThemeColor";
import { CSSProperties, useRef, useState } from "react";
import chroma from "chroma-js";
import { Link, useLocation } from "react-router-dom";
import { Avatar, Popover } from "@/components/core";

export function Navbar() {
    const darkMode = useThemeStore.getState().darkMode;
    const pathname = useLocation().pathname;

    const baseColor = useThemeColor("primary");

    const [dropdownMenuOpen, setDropdownMenuOpen] = useState<boolean>(false);
    const dropdownMenuButtonRef = useRef(null);

    const variables = {
        "--navbar-bg-color": chroma(baseColor).hex(),
        "--navbar-border-color": chroma(baseColor).hex(),
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
                                    src="dm3.png"
                                    alt="icon"
                                    draggable={false}
                                />
                            </div>
                            <h1 className={styles["title"]}>CdsCTF</h1>
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
                            style={{
                                width: "fit-content",
                                height: "fit-content",
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
                        <Popover
                            opened={dropdownMenuOpen}
                            onChange={setDropdownMenuOpen}
                            offsetY={20}
                            content={
                                <div
                                    style={{
                                        width: "10rem",
                                        height: "100px",
                                        borderRadius: "8px",
                                        backgroundColor: "var(--bg-2-color)",
                                        color: "var(--text-color)",
                                        boxShadow:
                                            "0px 4px 20px rgba(0, 0, 0, 0.1)",
                                        zIndex: 1000,
                                    }}
                                >
                                    1
                                </div>
                            }
                        >
                            <div
                                className={styles["avatar"]}
                                onClick={() => {
                                    setDropdownMenuOpen((r) => !r);
                                }}
                                ref={dropdownMenuButtonRef}
                            >
                                <Avatar
                                    src={"https://e23.dev/Ella_Avatar.png"}
                                    fallback={<>E</>}
                                    color={"transparent"}
                                />
                            </div>
                        </Popover>
                    </div>
                </div>
            </div>
        </header>
    );
}
