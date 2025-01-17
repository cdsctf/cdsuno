import { Box, Button, Image, Badge } from "@/components/core";
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
        <Box className={clsx(styles["root"], "flex flex-col w-full")}>
            {games?.length ? (
                <>
                    <Box className={styles["right-section"]}>
                        <Box
                            className={clsx(
                                styles["scoreboard"],
                                "flex flex-col"
                            )}
                        >
                            <Box
                                className={
                                    "flex w-full justify-center items-center select-none gap-[10px]"
                                }
                            >
                                <span className="font-semibold text-xl text-[var(--color-primary)] dark:text-[white]">
                                    积分榜
                                </span>
                            </Box>
                            <Box
                                className={
                                    "flex flex-col w-full gap-[5px] flex-1 relative"
                                }
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
                            </Box>
                            <Box className={styles["trapezoid"]} />
                            <CupBold
                                color={"white"}
                                className={styles["cup"]}
                            />
                            {!scoreboard?.length && (
                                <Box
                                    className={clsx(
                                        "flex flex-col items-center gap-[5px]",
                                        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2",
                                        "text-[color-mix(in_srgb,light-dark(var(--color-primary),_white)_40%,transparent_60%)]"
                                    )}
                                >
                                    <Planet2BoldDuotone />
                                    <span>暂无数据</span>
                                </Box>
                            )}
                        </Box>
                    </Box>

                    <Box className={styles["left-section"]}>
                        <Box className={styles["panel"]}>
                            <Image
                                src={`/api/games/${games?.[index]?.id}/poster`}
                                height="50vh"
                                width="45vw"
                                radius={25}
                                className="shadow-xl"
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
                                            className={"h-[65%] aspect-square"}
                                        >
                                            <Image
                                                src={`/api/games/${games?.[index]?.id}/icon`}
                                                fallback={
                                                    <PlanetBold
                                                        color={"white"}
                                                        className={
                                                            "h-[65%] w-[65%]"
                                                        }
                                                    />
                                                }
                                                height="100%"
                                                width="100%"
                                                radius={9999}
                                                className={
                                                    "border-2 border-solid border-white bg-[transparent]"
                                                }
                                            />
                                        </Box>
                                    </Box>
                                    <Box
                                        className={
                                            "flex flex-col flex-1 h-[65%] w-full gap-[1px]"
                                        }
                                    >
                                        <span
                                            className={clsx(
                                                "font-semibold text-3xl max-w-[80%] text-nowrap overflow-hidden text-ellipsis",
                                                "text-[var(--color-primary)] dark:text-[white]"
                                            )}
                                        >
                                            {games?.[index]?.title}
                                        </span>
                                        <span
                                            className={clsx(
                                                "font-semibold text-3xl max-w-[75%] text-nowrap overflow-hidden text-ellipsis",
                                                "text-[var(--color-primary)] dark:text-[white]"
                                            )}
                                        >
                                            {games?.[index]?.sketch}
                                        </span>
                                    </Box>
                                </Box>
                            </Box>
                            <Box className={styles["enter"]}>
                                <Button
                                    icon={<PlayCircleBold />}
                                    className="w-[10rem] h-[4rem] rounded-full text-lg"
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
                                        className="w-full h-[1.5rem]"
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
        </Box>
    );
}
