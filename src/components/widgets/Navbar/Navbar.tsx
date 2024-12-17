import PlanetBoldDuotone from "~icons/solar/planet-bold-duotone";
import Book2BoldDuotone from "~icons/solar/book-2-bold-duotone";
import FlagBoldDuotone from "~icons/solar/flag-bold-duotone";
import UsersGroupTwoRoundedBoldDuotone from "~icons/solar/users-group-two-rounded-bold-duotone";
import SolarSettingsBoldDuotone from "~icons/solar/settings-bold-duotone";
import SolarRoundArrowLeftBoldDuotone from "~icons/solar/round-arrow-left-bold-duotone";
import styles from "./Navbar.module.scss";
import { useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { Avatar, Button, Popover, Tooltip } from "@/components/core";
import { Box } from "@/components/core/Box";
import { IconButton } from "@/components/core/IconButton";
import { Dropdown } from "./Dropdown";
import { Flex } from "@/components/core/Flex";
import React from "react";

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
            icon: <SolarSettingsBoldDuotone />,
            label: "全局",
            href: "/settings/system",
        },
        {
            icon: <Book2BoldDuotone />,
            label: "题库",
            href: "/settings/challenges",
        },
        {
            icon: <FlagBoldDuotone />,
            label: "比赛",
            href: "/settings/games",
        },
        {
            icon: <UsersGroupTwoRoundedBoldDuotone />,
            label: "团队",
            href: "/settings/users",
        },
        {
            icon: <UsersGroupTwoRoundedBoldDuotone />,
            label: "用户",
            href: "/settings/users",
        },
    ];

    const location = useLocation();

    const finalLinks = useMemo(() => {
        if (location.pathname.startsWith("/settings")) {
            return settingLinks;
        }
        return defaultLinks;
    }, [location.pathname]);

    const [dropdownMenuOpen, setDropdownMenuOpen] = useState<boolean>(false);
    const dropdownMenuButtonRef = useRef(null);

    return (
        <header className={styles["root"]}>
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
            <Flex gap={3} align={"center"}>
                {finalLinks.map((item, index) => (
                    <React.Fragment key={index}>
                        <Link to={item?.href} draggable={false}>
                            <Button
                                icon={item?.icon}
                                variant={"ghost"}
                                color={"white"}
                                shadow={"none"}
                                radius={"9999px"}
                            >
                                <span
                                    style={{
                                        fontSize: "1rem",
                                    }}
                                >
                                    {item?.label}
                                </span>
                            </Button>
                        </Link>
                        {index !== finalLinks.length - 1 && (
                            <span
                                style={{
                                    userSelect: "none",
                                }}
                            >
                                /
                            </span>
                        )}
                    </React.Fragment>
                ))}
            </Flex>
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
