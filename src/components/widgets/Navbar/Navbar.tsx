import PlanetBold from "~icons/solar/planet-bold";
import Book2Bold from "~icons/solar/book-2-bold";
import FlagBold from "~icons/solar/flag-bold";
import UsersGroupTwoRoundedBold from "~icons/solar/users-group-two-rounded-bold";
import UserCircleBold from "~icons/solar/user-circle-bold";
import SolarSettingsBold from "~icons/solar/settings-bold";
import SolarRoundArrowLeftBold from "~icons/solar/round-arrow-left-bold";
import StarFallMinimalistic2Bold from "~icons/solar/star-fall-minimalistic-2-bold";
import CupStarBold from "~icons/solar/cup-star-bold";
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
import { useAuthStore } from "@/stores/auth";
import { useSharedStore } from "@/stores/shared";

export function Navbar() {
    const location = useLocation();
    const { id } = useParams();
    const authStore = useAuthStore();
    const sharedStore = useSharedStore();

    const links = {
        default: [
            {
                icon: <Book2Bold />,
                label: "题库",
                href: "/challenges",
            },
            {
                icon: <FlagBold />,
                label: "比赛",
                href: "/games",
            },
            {
                icon: <UsersGroupTwoRoundedBold />,
                label: "团队",
                href: "/teams",
            },
        ],
        setting: [
            {
                icon: <SolarSettingsBold />,
                label: "全局",
                href: "/settings/system",
            },
            {
                icon: <Book2Bold />,
                label: "题库",
                href: "/settings/challenges",
            },
            {
                icon: <FlagBold />,
                label: "比赛",
                href: "/settings/games",
            },
            {
                icon: <UsersGroupTwoRoundedBold />,
                label: "团队",
                href: "/settings/users",
            },
            {
                icon: <UsersGroupTwoRoundedBold />,
                label: "用户",
                href: "/settings/users",
            },
        ],
        game: [
            {
                icon: <StarFallMinimalistic2Bold />,
                label: "题目",
                href: `/games/${id}/challenges`,
            },
            {
                icon: <CupStarBold />,
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
                                    fallback={<PlanetBold />}
                                    radius={"30%"}
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
                            {mode === "game"
                                ? game?.title
                                : sharedStore?.config?.site?.title}
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
                                radius={9999}
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
                    </React.Fragment>
                ))}
            </Flex>
            <Box className={styles["right-section"]}>
                <Box className={styles["features-wrapper"]}>
                    <Box className={styles["features"]}>
                        {mode === "default" ? (
                            <Link to={"/settings"} draggable={false}>
                                <Tooltip content={"管理"} placement={"bottom"}>
                                    <IconButton
                                        variant={"ghost"}
                                        color={"white"}
                                    >
                                        <SolarSettingsBold />
                                    </IconButton>
                                </Tooltip>
                            </Link>
                        ) : (
                            <Link to={"/"} draggable={false}>
                                <Tooltip content={"返回"} placement={"bottom"}>
                                    <IconButton
                                        variant={"ghost"}
                                        color={"white"}
                                    >
                                        <SolarRoundArrowLeftBold />
                                    </IconButton>
                                </Tooltip>
                            </Link>
                        )}
                        <Popover content={<Dropdown />}>
                            <Box className={styles["avatar"]}>
                                <Avatar
                                    src={
                                        authStore?.user
                                            ? `/api/users/${authStore?.user?.id}/avatar`
                                            : ""
                                    }
                                    fallback={<UserCircleBold color="white" />}
                                    color={"#ffffff"}
                                    size={2}
                                />
                            </Box>
                        </Popover>
                    </Box>
                </Box>
            </Box>
        </header>
    );
}
