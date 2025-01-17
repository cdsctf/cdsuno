import { Box, Flex, Stack } from "@/components/core";
import { Sidebar } from "./_blocks/Sidebar";
import { Outlet, useParams } from "react-router";
import styles from "./layout.module.scss";
import { useEffect, useState } from "react";
import { Challenge } from "@/models/challenge";
import { getChallenges } from "@/api/challenge";
import Context from "./Context";
import { useSharedStore } from "@/stores/shared";
import { useCategoryStore } from "@/stores/category";
import { Divider } from "@/components/core/Divider";

export function Layout() {
    const sharedStore = useSharedStore();
    const categoryStore = useCategoryStore();

    const { id } = useParams();
    const [challenge, setChallenge] = useState<Challenge>();
    const [refresh, setRefresh] = useState(0);

    function fetchChallenge() {
        getChallenges({
            id: Number(id),
        }).then((res) => {
            setChallenge(res.data?.[0]);
        });
    }

    useEffect(() => {
        fetchChallenge();
    }, [refresh]);

    useEffect(() => {
        if (challenge) {
            document.title = `${challenge?.title} - ${sharedStore?.config?.site?.title}`;
        }
    }, [challenge]);

    return (
        <Context.Provider
            value={{
                challenge: challenge,
                setRefresh: () => {
                    setRefresh((prev) => prev + 1);
                },
            }}
        >
            <Flex className={styles["root"]} gap={"3rem"} align={"flex-start"}>
                <Sidebar />
                <Stack className={styles["paper"]}>
                    <Flex
                        width={"100%"}
                        justify={"space-between"}
                        align={"center"}
                    >
                        <Flex
                            align={"center"}
                            gap={10}
                            className={styles["category"]}
                            style={{
                                color: categoryStore?.getCategory(
                                    challenge?.category
                                )?.color,
                            }}
                        >
                            <Box>
                                {
                                    categoryStore?.getCategory(
                                        challenge?.category
                                    )?.icon
                                }
                            </Box>
                            <span>
                                {categoryStore
                                    ?.getCategory(challenge?.category)
                                    ?.name?.toUpperCase()}
                            </span>
                        </Flex>
                        <h2 className={styles["title"]}>{challenge?.title}</h2>
                    </Flex>
                    <Divider variant={"dashed"} />
                    <Outlet />
                </Stack>
            </Flex>
        </Context.Provider>
    );
}
