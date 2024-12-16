import { Box, Button, Stack, Image, Flex, Badge } from "@/components/core";
import PlayCircleBold from "~icons/solar/play-circle-bold";
import styles from "./Recent.module.scss";
import { Tip } from "./Tip";
import { Game, ScoreRecord } from "@/models/game";
import React, { useEffect, useState } from "react";
import { get, getScoreboard } from "@/api/game";
import CupBold from "~icons/solar/cup-bold";

export function Recent() {
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
            }, 3000);
            return () => {
                clearInterval(timer);
            };
        }
    }, [games]);

    return (
        <Stack className={styles["root"]} width={"100%"}>
            <Box className={styles["right-section"]}>
                <Stack className={styles["scoreboard"]}>
                    <Flex
                        gap={10}
                        width={"100%"}
                        justify={"center"}
                        align={"center"}
                        style={{
                            userSelect: "none",
                        }}
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
                    </Flex>
                    {scoreboard?.map((item, index) => (
                        <Flex key={index} width={"100%"} align={"center"}>
                            <Flex gap={10} align={"center"}>
                                <Box>{getRankIcon(item?.game_team?.rank!)}</Box>
                                <span>
                                    <Badge>{item?.game_team?.team?.name}</Badge>
                                </span>
                            </Flex>
                            <Flex
                                justify={"flex-end"}
                                style={{
                                    flex: 1,
                                }}
                            >
                                {item?.game_team?.pts}
                            </Flex>
                        </Flex>
                    ))}
                    <Box className={styles["trapezoid"]} />
                    <CupBold color={"white"} className={styles["cup"]} />
                </Stack>
            </Box>

            <Box className={styles["left-section"]}>
                <Box className={styles["panel"]}>
                    <Box className={styles["poster"]}>
                        <Image
                            src={`/api/games/${games?.[index]?.id || 1}/poster`}
                            height="50vh"
                            width="45vw"
                            radius={25}
                            style={{
                                boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                            }}
                        />
                    </Box>
                    <Box className={styles["info-section"]}>
                        <Flex
                            className={styles["info"]}
                            align={"center"}
                            gap={20}
                        >
                            <Box className={styles["icon-section"]}>
                                <Box
                                    style={{
                                        height: "65%",
                                        aspectRatio: "1",
                                    }}
                                >
                                    <Image
                                        src={`/api/games/${games?.[index]?.id || 1}/icon`}
                                        height="100%"
                                        width="100%"
                                        radius={9999}
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
                                        color: "white",
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
                                        color: "white",
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
                        </Flex>
                    </Box>
                    <Box className={styles["enter"]}>
                        <Button
                            icon={<PlayCircleBold />}
                            height={"4rem"}
                            width={"10rem"}
                            radius={"9999px"}
                        >
                            进入
                        </Button>
                    </Box>
                    <Box className={styles["trapezoid"]} />
                    <Flex
                        className={styles["pagination"]}
                        gap={10}
                        width={"80%"}
                    >
                        {games?.map((_, i) => (
                            <Button
                                key={i}
                                width={"100%"}
                                color={i === index ? "primary" : "#2222221d"}
                                onClick={() => {
                                    setIndex(i);
                                }}
                            />
                        ))}
                    </Flex>
                </Box>
            </Box>

            <Tip />
        </Stack>
    );
}
