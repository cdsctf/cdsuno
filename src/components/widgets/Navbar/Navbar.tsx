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
import { Avatar, Popover, Tooltip } from "@/components/core";
import { Icon } from "@/components/core/Icon";
import { Box } from "@/components/core/Box";
import { IconButton } from "@/components/core/IconButton";
import { Dropdown } from "./Dropdown";

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
    ];

    const location = useLocation();

    const finalLinks = useMemo(() => {
        if (location.pathname.startsWith("/settings")) {
            return settingLinks;
        }
        return defaultLinks;
    }, [location.pathname]);

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
            <Box className={styles["left-section"]}>
                <Box className={styles["info-wrapper"]}>
                    <Link to={"/"} draggable={false}>
                        <Box className={styles["info"]}>
                            <Box className={styles["logo"]}>
                                <img
                                    src="/api/configs/icon"
                                    alt="icon"
                                    draggable={false}
                                />
                            </Box>
                            <h1 className={styles["title"]}>CdsCTF</h1>
                        </Box>
                    </Link>
                </Box>
            </Box>
            <Box className={styles["links"]}>
                {finalLinks.map((item) => (
                    <Link to={item?.href} key={item?.href} draggable={false}>
                        <Box
                            className={styles["link"]}
                            data-active={pathname === item?.href}
                        >
                            <Box className={styles["icon"]}>
                                <Icon icon={item?.icon} />
                            </Box>
                            <Box className={styles["label"]}>{item?.label}</Box>
                        </Box>
                    </Link>
                ))}
            </Box>
            <Box className={styles["right-section"]}>
                <Box className={styles["features-wrapper"]}>
                    <Box className={styles["features"]}>
                        {location.pathname.startsWith("/settings") ? (
                            <Link to={"/"} draggable={false}>
                                <Tooltip content={"主页"} position={"bottom"}>
                                    <IconButton
                                        variant={"ghost"}
                                        color={"white"}
                                    >
                                        <SolarRoundArrowLeftBoldDuotone />
                                    </IconButton>
                                </Tooltip>
                            </Link>
                        ) : (
                            <Link to={"/settings"} draggable={false}>
                                <Tooltip content={"管理"} position={"bottom"}>
                                    <IconButton
                                        variant={"ghost"}
                                        color={"white"}
                                    >
                                        <SolarSettingsBoldDuotone />
                                    </IconButton>
                                </Tooltip>
                            </Link>
                        )}
                        <Popover
                            opened={dropdownMenuOpen}
                            onChange={setDropdownMenuOpen}
                            offsetY={20}
                            content={<Dropdown />}
                        >
                            <Box
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
                            </Box>
                        </Popover>
                    </Box>
                </Box>
            </Box>
        </header>
    );
}
