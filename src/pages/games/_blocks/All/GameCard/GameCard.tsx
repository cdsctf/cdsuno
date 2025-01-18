import { Box, Image } from "@/components/core";
import styles from "./GameCard.module.scss";
import { Game } from "@/models/game";
import clsx from "clsx";

export interface GameCardProps {
    game: Game;
    onClick?: () => void;
}

export function GameCard(props: GameCardProps) {
    const { game, onClick } = props;

    return (
        <Box
            className={clsx(styles["root"], "flex items-start gap-[30px]")}
            onClick={onClick}
        >
            <Image
                src={`/api/games/${game?.id}/poster`}
                width={"25%"}
                radius={"20px 0 0 20px"}
            />
            <Box className={"flex flex-col gap-[10px] w-1/2 my-2"}>
                <h2
                    style={{
                        fontSize: "1.25rem",
                        fontWeight: 600,
                    }}
                >
                    {game?.title}
                </h2>
                <p
                    style={{
                        fontSize: "0.875rem",
                        fontWeight: 500,
                    }}
                >
                    {game?.sketch}
                </p>
            </Box>
            <Box className={styles["trapezoid"]} />
        </Box>
    );
}
