import { Box, Image } from "@/components/core";
import styles from "./index.module.scss";
import { MarkdownRender } from "@/components/utils/MarkdownRender";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Game } from "@/models/game";
import { get } from "@/api/game";
import clsx from "clsx";

export function Index() {
    const { id } = useParams();

    const [game, setGame] = useState<Game>();

    function fetchGame() {
        get({
            id: Number(id),
        }).then((res) => {
            setGame(res?.data?.[0]);
        });
    }

    useEffect(() => {
        fetchGame();
    }, []);

    return (
        <Box className={clsx(styles["root"], "flex items-start gap-[5rem]")}>
            <Box className={styles["paper"]}>
                <MarkdownRender src={game?.description} />
            </Box>
            <Box
                className={clsx(styles["panel"], "flex flex-col items-center")}
            >
                <Image
                    src={`/api/games/${id}/poster`}
                    width={"100%"}
                    className={"aspect-16/9"}
                />
                <h1 className={styles["title"]}>{game?.title}</h1>
            </Box>
        </Box>
    );
}
