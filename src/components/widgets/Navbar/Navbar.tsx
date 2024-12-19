import PlanetBoldDuotone from "~icons/solar/planet-bold-duotone";
import Book2BoldDuotone from "~icons/solar/book-2-bold-duotone";
import FlagBoldDuotone from "~icons/solar/flag-bold-duotone";
import UsersGroupTwoRoundedBoldDuotone from "~icons/solar/users-group-two-rounded-bold-duotone";
import SolarSettingsBoldDuotone from "~icons/solar/settings-bold-duotone";
import SolarRoundArrowLeftBoldDuotone from "~icons/solar/round-arrow-left-bold-duotone";
import StarFallMinimalistic2BoldDuotone from "~icons/solar/star-fall-minimalistic-2-bold-duotone";
import CupStarBoldDuotone from "~icons/solar/cup-star-bold-duotone";
import styles from "./Navbar.module.scss";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router";
import {
    Avatar,
    Button,
    Popover,
    Tooltip,
    Image,
    IconButton,
    Flex,
    Box,
} from "@/components/core";
import { Dropdown } from "./Dropdown";
import React from "react";
import { get } from "@/api/game";
import { Game } from "@/models/game";

export function Navbar() {
    const location = useLocation();
    const { id } = useParams();

    const links = {
        default: [
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
        ],
        setting: [
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
        ],
        game: [
            {
                icon: <StarFallMinimalistic2BoldDuotone />,
                label: "题目",
                href: `/games/${id}/challenges`,
            },
            {
                icon: <CupStarBoldDuotone />,
                label: "积分榜",
                href: `/games/${id}/scoreboard`,
            },
        ],
    };

    const mode: "default" | "game" | "setting" = useMemo(() => {
        const path = location.pathname;
        if (path.startsWith("/games") && path !== "/games") {
            return "game";
        }

        if (path.startsWith("/settings")) {
            return "setting";
        }

        return "default";
    }, [location.pathname]);

    const [game, setGame] = useState<Game>();

    useEffect(() => {
        if (mode !== "game") return;
        get({
            id: Number(id),
        }).then((res) => {
            setGame(res.data?.[0]);
        });
    }, [location.pathname]);

    const [dropdownMenuOpen, setDropdownMenuOpen] = useState<boolean>(false);
    const dropdownMenuButtonRef = useRef(null);

    return (
        <header className={styles["root"]}>
            <Box className={styles["left-section"]}>
                <Link
                    to={mode === "game" ? `/games/${id}` : "/"}
                    draggable={false}
                    style={{ width: "fit-content", display: "block" }}
                >
                    <Button
                        icon={
                            <Box className={styles["logo"]}>
                                <Image
                                    src={
                                        mode === "game"
                                            ? `/api/games/${id}/icon`
                                            : "/api/configs/icon"
                                    }
                                    fallback={<PlanetBoldDuotone />}
                                    radius={9999}
                                    style={{
                                        backgroundColor: "transparent",
                                    }}
                                />
                            </Box>
                        }
                        variant={"ghost"}
                        color={"white"}
                        shadow={"none"}
                        radius={9999}
                    >
                        <h1 className={styles["title"]}>
                            {mode === "game" ? game?.title : "CdsCTF"}
                        </h1>
                    </Button>
                </Link>
            </Box>
            <Flex gap={3} align={"center"}>
                {links[mode].map((item, index) => (
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
                        {index !== links[mode].length - 1 && (
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
                        {mode === "default" ? (
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
                        ) : (
                            <Link to={"/"} draggable={false}>
                                <Tooltip content={"返回"} position={"bottom"}>
                                    <IconButton
                                        variant={"ghost"}
                                        color={"white"}
                                    >
                                        <SolarRoundArrowLeftBoldDuotone />
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
