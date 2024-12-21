import { get, getStatus } from "@/api/challenge";
import {
    Button,
    Dialog,
    Pagination,
    Stack,
    TextInput,
} from "@/components/core";
import { Flex } from "@/components/core/Flex";
import { ChallengeModal } from "@/components/modals/ChallengeModal";
import { ChallengeCard } from "@/components/widgets/ChallengeCard";
import { Challenge, ChallengeStatus } from "@/models/challenge";
import { useAuthStore } from "@/stores/auth";
import { useEffect, useMemo, useState } from "react";
import MinimalisticMagniferBoldDuotone from "~icons/solar/minimalistic-magnifer-bold-duotone";
import HashtagBoldDuotone from "~icons/solar/hashtag-bold-duotone";
import { Grid } from "@/components/core/Grid";
import { useResizeDetector } from "react-resize-detector";
import { LoadingOverlay } from "@/components/core/LoadingOverlay/LoadingOverlay";
import { Box } from "@/components/core/Box";
import { useSharedStore } from "@/stores/shared";

export function Index() {
    const authStore = useAuthStore();
    const sharedStore = useSharedStore();

    const {
        width: challengeGroupWidth,
        height: challengeGroupHeight,
        ref: challengeGroupRef,
    } = useResizeDetector();

    const [size, setSize] = useState(20);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const pageTotal = useMemo(() => {
        return Math.ceil(total / size) === Infinity
            ? 1
            : Math.ceil(total / size);
    }, [total, size]);
    const [id, setId] = useState<number>();
    const [idInput, setIdInput] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const [challenges, setChallenges] = useState<Array<Challenge>>();
    const [challengeStatus, setChallengeStatus] =
        useState<Record<number, ChallengeStatus>>();

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedChallenge, setSelectedChallenge] = useState<Challenge>();
    const [selectedChallengeStatus, setSelectedChallengeStatus] =
        useState<ChallengeStatus>();

    function fetchChallenges() {
        setLoading(true);
        setChallenges([]);
        get({
            id: id ? id : undefined,
            is_practicable: true,
            page: page,
            size: size,
            title: search,
        }).then((res) => {
            setChallenges(res.data);
            setTotal(res.total || 0);
        });
    }

    function fetchChallengeStatus() {
        getStatus({
            challenge_ids: challenges?.map((challenge) => challenge.id!) || [],
            user_id: authStore?.user?.id,
        }).then((res) => {
            setChallengeStatus(res.data);
        });
        setLoading(false);
    }

    useEffect(() => {
        if (challengeGroupWidth && challengeGroupHeight) {
            fetchChallenges();
        }
    }, [page, search, size, id]);

    useEffect(() => {
        setSize(
            Math.floor((challengeGroupWidth! - 130) / 260) *
                Math.floor(challengeGroupHeight! / 150) || 0
        );
    }, [challengeGroupHeight, challengeGroupWidth]);

    useEffect(() => {
        if (challenges?.length) {
            fetchChallengeStatus();
        }
    }, [challenges, sharedStore.refresh]);

    return (
        <>
            <Flex
                style={{
                    padding: "35px 10rem",
                }}
                align={"flex-start"}
            >
                <Stack width={"100%"} gap={30} align={"center"}>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            setSearch(searchInput);
                            setId(parseInt(idInput, 16));
                        }}
                        style={{
                            width: "80%",
                        }}
                    >
                        <Flex align={"center"} gap={15}>
                            <TextInput
                                icon={<HashtagBoldDuotone />}
                                placeholder={"题目 ID"}
                                value={idInput}
                                onChange={setIdInput}
                                variant={"solid"}
                                width={"10%"}
                            />
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
                    <Box
                        style={{
                            width: "100%",
                            position: "relative",
                        }}
                    >
                        <LoadingOverlay
                            visible={loading}
                            style={{
                                borderRadius: "10px",
                            }}
                        />
                        <Grid
                            item={{
                                width: "16rem",
                                height: "9rem",
                            }}
                            justify={"center"}
                            align={"flex-start"}
                            gap={16}
                            style={{
                                height: "calc(100vh - 275px)",
                                padding: "1rem",
                                borderRadius: "15px",
                                backgroundColor:
                                    "light-dark(#0000000d, #ffffff0d)",
                            }}
                            ref={challengeGroupRef}
                        >
                            {challenges?.map((challenge) => (
                                <ChallengeCard
                                    challenge={challenge}
                                    status={challengeStatus?.[challenge.id!]}
                                    key={challenge?.id}
                                    onClick={() => {
                                        setSelectedChallenge(challenge);
                                        setSelectedChallengeStatus(
                                            challengeStatus?.[challenge.id!]
                                        );
                                        setModalOpen(true);
                                    }}
                                />
                            ))}
                        </Grid>
                    </Box>
                    <Stack align={"center"} width={"100%"}>
                        <Pagination
                            total={pageTotal}
                            value={page}
                            onChange={(page) => setPage(page)}
                        />
                    </Stack>
                </Stack>
            </Flex>
            <Dialog
                open={modalOpen}
                onClose={() => {
                    setModalOpen(false);
                }}
            >
                <ChallengeModal
                    challenge={selectedChallenge}
                    status={selectedChallengeStatus}
                />
            </Dialog>
        </>
    );
}
