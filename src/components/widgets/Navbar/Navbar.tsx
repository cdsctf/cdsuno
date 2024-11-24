import { useThemeStore } from "@/stores/theme";
import Sun2BoldDuotone from "~icons/solar/sun-2-bold-duotone";
import MoonBoldDuotone from "~icons/solar/moon-bold-duotone";
import PlanetBoldDuotone from "~icons/solar/planet-bold-duotone";
import Book2BoldDuotone from "~icons/solar/book-2-bold-duotone";
import FlagBoldDuotone from "~icons/solar/flag-bold-duotone";
import UsersGroupTwoRoundedBoldDuotone from "~icons/solar/users-group-two-rounded-bold-duotone";
import SolarSettingsBoldDuotone from "~icons/solar/settings-bold-duotone";
import SolarFiltersBoldDuotone from "~icons/solar/filters-bold-duotone";
import SolarRoundArrowLeftBoldDuotone from "~icons/solar/round-arrow-left-bold-duotone";
import styles from "./Navbar.module.scss";
import useThemeColor from "@/hooks/useThemeColor";
import { CSSProperties, useMemo, useRef, useState } from "react";
import chroma from "chroma-js";
import { Link, useLocation } from "react-router";
import { Avatar, Popover } from "@/components/core";
import { Icon } from "@/components/core/Icon";
import { Box } from "@/components/core/Box";

export function Navbar() {
    const defaultLinks = [
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
        {
            icon: <SolarSettingsBoldDuotone />,
            label: "管理",
            href: "/settings",
        },
    ];

    const settingLinks = [
        {
            icon: <Book2BoldDuotone />,
            label: "题库管理",
            href: "/settings/challenges",
        },
        {
            icon: <FlagBoldDuotone />,
            label: "比赛管理",
            href: "/settings/games",
        },
        {
            icon: <UsersGroupTwoRoundedBoldDuotone />,
            label: "用户管理",
            href: "/settings/users",
        },
        {
            icon: <SolarSettingsBoldDuotone />,
            label: "系统设置",
            href: "/settings/system",
        },
        {
            icon: <SolarFiltersBoldDuotone />,
            label: "外观设置",
            href: "/settings/appearance",
        },
        {
            icon: <SolarRoundArrowLeftBoldDuotone />,
            label: "返回上级",
            href: "/",
        },
    ];

    const location = useLocation();

    const finalLinks = useMemo(() => {
        if (location.pathname.startsWith("/settings")) {
            return settingLinks;
        }
        return defaultLinks;
    }, [location.pathname]);

    const darkMode = useThemeStore.getState().darkMode;
    const pathname = useLocation().pathname;

    const baseColor = useThemeColor("primary");

    const [dropdownMenuOpen, setDropdownMenuOpen] = useState<boolean>(false);
    const dropdownMenuButtonRef = useRef(null);

    const variables = {
        "--navbar-bg-color": chroma(baseColor).hex(),
        "--navbar-border-color": chroma(baseColor).hex(),
    } as CSSProperties;

    return (
        <header className={styles["root"]} style={variables}>
            <div className={styles["left-section"]}>
                <div className={styles["info-wrapper"]}>
                    <Link to={"/"} draggable={false}>
                        <div className={styles["info"]}>
                            <div className={styles["logo"]}>
                                <img
                                    src="/api/configs/icon"
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
                {finalLinks.map((item) => (
                    <Link to={item?.href} key={item?.href} draggable={false}>
                        <div
                            className={styles["link"]}
                            data-active={pathname === item?.href}
                        >
                            <div className={styles["icon"]}>
                                <Icon icon={item?.icon} />
                            </div>
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
                                <Sun2BoldDuotone />
                            ) : (
                                <MoonBoldDuotone />
                            )}
                        </button>
                        <Popover
                            opened={dropdownMenuOpen}
                            onChange={setDropdownMenuOpen}
                            offsetY={20}
                            content={
                                <Box
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
                                </Box>
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
