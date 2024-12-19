import { Button, Flex, Pagination, Stack, TextInput } from "@/components/core";
import styles from "./All.module.scss";
import { useEffect, useState } from "react";
import MinimalisticMagniferBoldDuotone from "~icons/solar/minimalistic-magnifer-bold-duotone";
import { Game } from "@/models/game";
import { get } from "@/api/game";
import { GameCard } from "./GameCard";
import { useNavigate } from "react-router";

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
        <Stack
            className={styles["root"]}
            align={"center"}
            width={"100%"}
            gap={25}
        >
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    setSearch(searchInput);
                }}
                style={{
                    width: "80%",
                }}
            >
                <Flex align={"center"} gap={15}>
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
                </Flex>
            </form>
            <Stack width={"100%"} align={"center"} style={{ flex: 1 }} gap={15}>
                {games?.map((game) => (
                    <GameCard
                        key={game.id}
                        game={game}
                        onClick={() => navigate(`/games/${game?.id}`)}
                    />
                ))}
            </Stack>
            <Stack width={"100%"} align={"center"}>
                <Pagination
                    total={Math.ceil(total / size)}
                    value={page}
                    onChange={setPage}
                />
            </Stack>
        </Stack>
    );
}
