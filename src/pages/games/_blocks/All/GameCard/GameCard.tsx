import { Box, Flex, Image, Stack } from "@/components/core";
import styles from "./GameCard.module.scss";
import { Game } from "@/models/game";

export interface GameCardProps {
    game: Game;
}

export function GameCard(props: GameCardProps) {
    const { game } = props;

    return (
        <Flex className={styles["root"]} gap={30} align={"flex-start"}>
            <Image
                src={`/api/games/${game?.id}/poster`}
                width={"25%"}
                radius={"20px 0 0 20px"}
            />
            <Stack
                gap={10}
                width={"50%"}
                style={{
                    margin: "2rem 0",
                }}
            >
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
            </Stack>
            <Box className={styles["trapezoid"]} />
        </Flex>
    );
}
