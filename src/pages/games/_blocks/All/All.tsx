import { Box, Button, Pagination, TextInput } from "@/components/core";
import styles from "./All.module.scss";
import { useEffect, useState } from "react";
import MinimalisticMagniferBoldDuotone from "~icons/solar/minimalistic-magnifer-bold-duotone";
import { Game } from "@/models/game";
import { get } from "@/api/game";
import { GameCard } from "./GameCard";
import { useNavigate } from "react-router";
import { Empty } from "../_blocks/Empty";
import clsx from "clsx";

export function All() {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [games, setGames] = useState<Array<Game>>();

    const [size, _] = useState(4);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    function fetchGames() {
        get({
            title: search,
            sorts: "-id",
            size: size,
            page: page,
        }).then((res) => {
            setGames(res.data);
            setTotal(res.total || 0);
        });
    }

    useEffect(() => {
        fetchGames();
    }, [search, page]);

    return (
        <Box
            className={clsx(
                styles["root"],
                "flex flex-col items-center w-full gap-[25px]"
            )}
        >
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    setSearch(searchInput);
                }}
                className="w-3/4"
            >
                <Box className={"flex items-center gap-[15px]"}>
                    <TextInput
                        icon={<MinimalisticMagniferBoldDuotone />}
                        placeholder={"搜索"}
                        value={searchInput}
                        onChange={setSearchInput}
                        clearable
                        variant={"outlined"}
                        style={{
                            flex: "1",
                        }}
                    />
                    <Button type={"submit"}>搜索</Button>
                </Box>
            </form>
            <Box
                className={
                    "flex flex-col items-center flex-1 relative gap-[15px] w-full"
                }
            >
                {games?.length ? (
                    games?.map((game) => (
                        <GameCard
                            key={game.id}
                            game={game}
                            onClick={() => navigate(`/games/${game?.id}`)}
                        />
                    ))
                ) : (
                    <Empty />
                )}
            </Box>
            <Box className={"flex flex-col w-full items-center"}>
                <Pagination
                    total={Math.ceil(total / size)}
                    value={page}
                    onChange={setPage}
                />
            </Box>
        </Box>
    );
}
