import { Box, Button, Stack, Image, Badge } from "@/components/core";
import PlayCircleBold from "~icons/solar/play-circle-bold";
import styles from "./Recent.module.scss";
import { Tip } from "./Tip";
import { Game, ScoreRecord } from "@/models/game";
import React, { useEffect, useState } from "react";
import { get, getScoreboard } from "@/api/game";
import CupBold from "~icons/solar/cup-bold";
import Planet2BoldDuotone from "~icons/solar/planet-2-bold-duotone";
import PlanetBold from "~icons/solar/planet-bold";
import { useNavigate } from "react-router";
import { Empty } from "../_blocks/Empty";
import clsx from "clsx";

export function Recent() {
    const navigate = useNavigate();

    const [games, setGames] = useState<Array<Game>>();
    const [index, setIndex] = useState<number>(-1);

    const [scoreboard, setScoreboard] = useState<Array<ScoreRecord>>();

    function getRankIcon(rank: number): React.ReactElement | number {
        if (rank === 1) {
            return <CupBold style={{ color: "#FFC107" }} />;
        } else if (rank === 2) {
            return <CupBold style={{ color: "#9E9E9E" }} />;
        } else if (rank === 3) {
            return <CupBold style={{ color: "#FF9800" }} />;
        } else {
            return rank;
        }
    }

    useEffect(() => {
        get({
            sorts: "-id",
            size: 3,
            page: 1,
        }).then((res) => {
            setGames(res.data);
        });
    }, []);

    useEffect(() => {
        if (games?.length) {
            setIndex(0);
        }
    }, [games]);

    useEffect(() => {
        if (index !== -1) {
            getScoreboard(games?.[index]?.id!, {
                size: 10,
                page: 1,
            }).then((res) => {
                setScoreboard(res.data);
            });
        }
    }, [index]);

    useEffect(() => {
        if (games?.length) {
            const timer = setInterval(() => {
                setIndex((prev) => (prev === games.length - 1 ? 0 : prev + 1));
            }, 5000);
            return () => {
                clearInterval(timer);
            };
        }
    }, [games]);

    return (
        <Stack className={styles["root"]} width={"100%"}>
            {games?.length ? (
                <>
                    <Box className={styles["right-section"]}>
                        <Stack className={styles["scoreboard"]}>
                            <Box
                                className={
                                    "flex w-full justify-center items-center select-none gap-[10px]"
                                }
                            >
                                <span
                                    style={{
                                        fontWeight: 600,
                                        fontSize: "1.25rem",
                                        color: "light-dark(var(--color-primary), white)",
                                    }}
                                >
                                    积分榜
                                </span>
                            </Box>
                            <Stack
                                gap={5}
                                width={"100%"}
                                style={{ flex: 1, position: "relative" }}
                            >
                                {scoreboard?.map((item, index) => (
                                    <Box
                                        key={index}
                                        className={"flex w-full items-center"}
                                    >
                                        <Box
                                            className={
                                                "flex items-center gap-[10px]"
                                            }
                                        >
                                            <Box>
                                                {getRankIcon(
                                                    item?.game_team?.rank!
                                                )}
                                            </Box>
                                            <span>
                                                <Badge>
                                                    {
                                                        item?.game_team?.team
                                                            ?.name
                                                    }
                                                </Badge>
                                            </span>
                                        </Box>
                                        <Box
                                            className={
                                                "flex justify-end flex-1"
                                            }
                                        >
                                            {item?.game_team?.pts}
                                        </Box>
                                    </Box>
                                ))}
                            </Stack>
                            <Box className={styles["trapezoid"]} />
                            <CupBold
                                color={"white"}
                                className={styles["cup"]}
                            />
                            {!scoreboard?.length && (
                                <Stack
                                    style={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)",
                                        width: "50%",
                                        color: "color-mix(in srgb, light-dark(var(--color-primary), white) 40%, transparent 60%)",
                                    }}
                                    align={"center"}
                                    gap={5}
                                >
                                    <Planet2BoldDuotone />
                                    <span>暂无数据</span>
                                </Stack>
                            )}
                        </Stack>
                    </Box>

                    <Box className={styles["left-section"]}>
                        <Box className={styles["panel"]}>
                            <Image
                                src={`/api/games/${games?.[index]?.id}/poster`}
                                height="50vh"
                                width="45vw"
                                radius={25}
                                style={{
                                    boxShadow: "0 0 5px rgba(0, 0, 0, 0.5)",
                                }}
                            />
                            <Box className={styles["info-section"]}>
                                <Box
                                    className={clsx(
                                        styles["info"],
                                        "flex items-center gap-[20px]"
                                    )}
                                >
                                    <Box className={styles["icon-section"]}>
                                        <Box
                                            style={{
                                                height: "65%",
                                                aspectRatio: "1",
                                            }}
                                        >
                                            <Image
                                                src={`/api/games/${games?.[index]?.id}/icon`}
                                                fallback={
                                                    <PlanetBold
                                                        color={"white"}
                                                        style={{
                                                            height: "65%",
                                                            width: "65%",
                                                        }}
                                                    />
                                                }
                                                height="100%"
                                                width="100%"
                                                radius={9999}
                                                style={{
                                                    border: "1px solid white",
                                                    backgroundColor:
                                                        "transparent",
                                                }}
                                            />
                                        </Box>
                                    </Box>
                                    <Stack
                                        style={{
                                            flex: 1,
                                            height: "65%",
                                            width: "100%",
                                        }}
                                        gap={1}
                                    >
                                        <span
                                            style={{
                                                fontWeight: 600,
                                                fontSize: "1.75rem",
                                                color: "light-dark(var(--color-primary), white)",
                                                maxWidth: "80%",
                                                textWrap: "nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                            }}
                                        >
                                            {games?.[index]?.title}
                                        </span>
                                        <span
                                            style={{
                                                color: "light-dark(var(--color-primary), white)",
                                                fontStyle: "italic",
                                                textWrap: "nowrap",
                                                maxWidth: "75%",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                            }}
                                        >
                                            {games?.[index]?.sketch}
                                        </span>
                                    </Stack>
                                </Box>
                            </Box>
                            <Box className={styles["enter"]}>
                                <Button
                                    icon={<PlayCircleBold />}
                                    height={"4rem"}
                                    width={"10rem"}
                                    radius={"9999px"}
                                    onClick={() =>
                                        navigate(`/games/${games?.[index]?.id}`)
                                    }
                                >
                                    进入
                                </Button>
                            </Box>
                            <Box className={styles["trapezoid"]} />
                            <Box
                                className={clsx(
                                    styles["pagination"],
                                    "flex w-[80%] gap-[10px]"
                                )}
                            >
                                {games?.map((_, i) => (
                                    <Button
                                        key={i}
                                        width={"100%"}
                                        color={
                                            i === index
                                                ? "primary"
                                                : "light-dark(#0000000d, #ffffff0d)"
                                        }
                                        onClick={() => {
                                            setIndex(i);
                                        }}
                                    />
                                ))}
                            </Box>
                        </Box>
                    </Box>
                </>
            ) : (
                <Empty />
            )}

            <Tip />
        </Stack>
    );
}
