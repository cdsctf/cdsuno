import { Box } from "@/components/core";
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
import clsx from "clsx";

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
            <Box
                className={clsx(styles["root"], "flex gap-[3rem] items-start")}
            >
                <Sidebar />
                <Box className={clsx(styles["paper"], "flex flex-col gap-4")}>
                    <Box className={"flex w-full justify-between items-center"}>
                        <Box
                            className={clsx(
                                styles["category"],
                                "flex gap-[10px] items-center"
                            )}
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
                        </Box>
                        <h2 className={styles["title"]}>{challenge?.title}</h2>
                    </Box>
                    <Divider variant={"dashed"} />
                    <Outlet />
                </Box>
            </Box>
        </Context.Provider>
    );
}
