import { getChallenges, getChallengeStatus } from "@/api/challenge";
import { Button, Dialog, Pagination, TextInput } from "@/components/core";
import { ChallengeModal } from "@/components/modals/ChallengeModal";
import { ChallengeCard } from "@/components/widgets/ChallengeCard";
import { Challenge, ChallengeStatus } from "@/models/challenge";
import { useAuthStore } from "@/stores/auth";
import { useEffect, useState } from "react";
import MinimalisticMagniferBoldDuotone from "~icons/solar/minimalistic-magnifer-bold-duotone";
import HashtagBoldDuotone from "~icons/solar/hashtag-bold-duotone";
import { useResizeDetector } from "react-resize-detector";
import { LoadingOverlay } from "@/components/core/LoadingOverlay/LoadingOverlay";
import { Box } from "@/components/core/Box";
import { useSharedStore } from "@/stores/shared";
import { Empty } from "./_blocks/Empty";

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
    const [id, setId] = useState<number>();
    const [idInput, setIdInput] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const [cols, setCols] = useState(0);
    const [rows, setRows] = useState(0);

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
        getChallenges({
            id: id ? id : undefined,
            is_public: true,
            page: page,
            size: size,
            title: search,
        }).then((res) => {
            setChallenges(res.data);
            setTotal(res.total || 0);
        });
    }

    function fetchChallengeStatus() {
        getChallengeStatus({
            challenge_ids: challenges?.map((challenge) => challenge.id!) || [],
            user_id: authStore?.user?.id,
        }).then((res) => {
            setChallengeStatus(res.data);
        });
    }

    useEffect(() => {
        if (challengeGroupWidth && challengeGroupHeight) {
            fetchChallenges();
        }
    }, [page, search, size, id]);

    useEffect(() => {
        setCols(Math.floor((challengeGroupWidth! - 130) / 260) || 0);
        setRows(Math.floor(challengeGroupHeight! / 150) || 0);
    }, [challengeGroupHeight, challengeGroupWidth]);

    useEffect(() => {
        setSize(cols * rows);
    }, [cols, rows]);

    useEffect(() => {
        if (challenges?.length) {
            fetchChallengeStatus();
        }
        setLoading(false);
    }, [challenges, sharedStore.refresh]);

    useEffect(() => {
        document.title = `题库 - ${sharedStore?.config?.site?.title}`;
    }, [sharedStore?.config?.site?.title]);

    return (
        <>
            <Box className={"flex items-start px-[10rem] py-[35px]"}>
                <Box className={"flex flex-col w-full gap-[30px] items-center"}>
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
                        <Box className={"flex items-center gap-[15px]"}>
                            <TextInput
                                icon={<HashtagBoldDuotone />}
                                placeholder={"题目 ID"}
                                value={idInput}
                                onChange={setIdInput}
                                variant={"solid"}
                                width={"10%"}
                                style={{
                                    minWidth: "125px",
                                }}
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
                        </Box>
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
                        <Box
                            className={
                                "grid grid-cols-3 gap-[1rem] rounded-[15px] h-[calc(100vh-275px)]"
                            }
                            style={{
                                backgroundColor:
                                    "light-dark(#0000000d, #ffffff0d)",
                            }}
                            ref={challengeGroupRef}
                        >
                            {challenges?.length ? (
                                challenges?.map((challenge) => (
                                    <ChallengeCard
                                        challenge={challenge}
                                        status={
                                            challengeStatus?.[challenge.id!]
                                        }
                                        key={challenge?.id}
                                        onClick={() => {
                                            setSelectedChallenge(challenge);
                                            setSelectedChallengeStatus(
                                                challengeStatus?.[challenge.id!]
                                            );
                                            setModalOpen(true);
                                        }}
                                    />
                                ))
                            ) : (
                                <Empty />
                            )}
                        </Box>
                    </Box>
                    <Box className={"flex flex-col items-center w-full"}>
                        <Pagination
                            total={total}
                            size={size}
                            value={page}
                            onChange={(page) => setPage(page)}
                        />
                    </Box>
                </Box>
            </Box>
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
