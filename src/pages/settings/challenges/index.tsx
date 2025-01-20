import { getChallenges, updateChallenge } from "@/api/challenge";
import {
    Box,
    Button,
    Dialog,
    NumberInput,
    Pagination,
    Switch,
    TextInput,
} from "@/components/core";
import { Table } from "@/components/core/Table";
import { Challenge } from "@/models/challenge";
import { useSharedStore } from "@/stores/shared";
import { useToastStore } from "@/stores/toast";
import { useEffect, useState } from "react";
import MinimalisticMagniferBoldDuotone from "~icons/solar/minimalistic-magnifer-bold-duotone";
import PenNewSquareBold from "~icons/solar/pen-new-square-bold";
import GalleryEditBold from "~icons/solar/gallery-edit-bold";
import TrashBinTrashBold from "~icons/solar/trash-bin-trash-bold";
import { useCategoryStore } from "@/stores/category";
import { ChallengeCreateModal } from "./_blocks/ChallengeCreateModal";
import { useNavigate } from "react-router";
import { ChallengeDeleteModal } from "./_blocks/ChallengeDeleteModal";

export function Index() {
    const toastStore = useToastStore();
    const sharedStore = useSharedStore();
    const categoryStore = useCategoryStore();
    const navigate = useNavigate();

    const [challenges, setChallenges] = useState<Array<Challenge>>();
    const [total, setTotal] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [size, setSize] = useState<number>(7);
    const [sorts, setSorts] = useState<string>("id");
    const [search, setSearch] = useState<string>("");

    const [challengeCreateModalOpen, setChallengeCreateModalOpen] =
        useState<boolean>(false);
    const [challengeDeleteModalOpen, setChallengeDeleteModalOpen] =
        useState<boolean>(false);
    const [selectedChallenge, setSelectedChallenge] = useState<Challenge>();

    function fetchChallenges() {
        getChallenges({
            page: page,
            size: size,
            sorts: sorts,
            title: search,
        }).then((res) => {
            setChallenges(res.data);
            setTotal(res.total || 0);
        });
    }

    function handleVisibilityChange(challenge: Challenge) {
        updateChallenge({
            id: challenge.id,
            is_public: !challenge.is_public,
        })
            .then((res) => {
                toastStore?.add({
                    type: "success",
                    title: "成功",
                    description: `题目 ${challenge?.title} 可见性已设置为 ${res.data?.is_public ? "公开" : "隐藏"}`,
                });
            })
            .finally(() => {
                sharedStore?.setRefresh();
            });
    }

    useEffect(() => {
        fetchChallenges();
    }, [page, size, sorts, search, sharedStore?.refresh]);

    useEffect(() => {
        document.title = `题库管理 - ${sharedStore?.config?.site?.title}`;
    }, [sharedStore?.config?.site?.title]);

    return (
        <>
            <Box
                className={
                    "flex flex-col items-center gap-[20px] p-[20px] min-h-[calc(100vh-64px)]"
                }
            >
                <Box className={"flex w-4/5 gap-[20px] items-center"}>
                    <TextInput
                        placeholder={"搜索"}
                        icon={<MinimalisticMagniferBoldDuotone />}
                        value={search}
                        onChange={(value) => setSearch(value)}
                        clearable
                        className="flex-1"
                    />
                    <Button
                        variant={"solid"}
                        icon={<PenNewSquareBold />}
                        onClick={() => setChallengeCreateModalOpen(true)}
                    >
                        新建题目
                    </Button>
                </Box>
                <Box
                    className={
                        "w-4/5 flex-1 shadow-md rounded-lg overflow-scroll"
                    }
                >
                    <Table className="w-full">
                        <Table.Head className="bg-[var(--color-primary)] text-white">
                            <Table.Row>
                                <Table.Cell>公开</Table.Cell>
                                <Table.Cell
                                    sortDirection={
                                        sorts.includes("id")
                                            ? sorts.startsWith("-")
                                                ? "desc"
                                                : "asc"
                                            : undefined
                                    }
                                    onClick={() => {
                                        if (sorts === "id") {
                                            setSorts("-id");
                                        } else {
                                            setSorts("id");
                                        }
                                    }}
                                    className="min-w-[7rem] max-w-[7rem]"
                                >
                                    #
                                </Table.Cell>
                                <Table.Cell
                                    sortDirection={
                                        sorts.includes("title")
                                            ? sorts.startsWith("-")
                                                ? "desc"
                                                : "asc"
                                            : undefined
                                    }
                                    onClick={() => {
                                        if (sorts === "title") {
                                            setSorts("-title");
                                        } else {
                                            setSorts("title");
                                        }
                                    }}
                                    className="min-w-[20rem] max-w-[20rem]"
                                >
                                    标题
                                </Table.Cell>
                                <Table.Cell className="min-w-[10rem]">
                                    分类
                                </Table.Cell>
                                <Table.Cell className="w-[30rem]">
                                    描述
                                </Table.Cell>
                                <Table.Cell
                                    sortDirection={
                                        sorts.includes("updated_at")
                                            ? sorts.startsWith("-")
                                                ? "desc"
                                                : "asc"
                                            : undefined
                                    }
                                    onClick={() => {
                                        if (sorts === "updated_at") {
                                            setSorts("-updated_at");
                                        } else {
                                            setSorts("updated_at");
                                        }
                                    }}
                                >
                                    最后更新于
                                </Table.Cell>
                                <Table.Cell
                                    justify={"center"}
                                    className={"w-full"}
                                >
                                    操作
                                </Table.Cell>
                            </Table.Row>
                        </Table.Head>
                        <Table.Body>
                            {challenges?.map((challenge) => (
                                <Table.Row key={challenge.id}>
                                    <Table.Cell>
                                        <Switch
                                            checked={challenge?.is_public!}
                                            onChange={() => {
                                                handleVisibilityChange(
                                                    challenge
                                                );
                                            }}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>{challenge.id}</Table.Cell>
                                    <Table.Cell>
                                        <p className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap font-semibold">
                                            {challenge.title}
                                        </p>
                                    </Table.Cell>
                                    <Table.Cell className="min-w-[10rem]">
                                        <Box
                                            className={
                                                "flex items-center gap-[5px]"
                                            }
                                            style={{
                                                color: categoryStore?.getCategory(
                                                    challenge?.category
                                                )?.color,
                                            }}
                                        >
                                            {
                                                categoryStore?.getCategory(
                                                    challenge?.category
                                                )?.icon
                                            }
                                            {categoryStore
                                                ?.getCategory(
                                                    challenge?.category
                                                )
                                                ?.name?.toUpperCase()}
                                        </Box>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <p
                                            className={
                                                "max-w-[500px] text-nowrap overflow-hidden text-ellipsis whitespace-nowrap"
                                            }
                                        >
                                            {challenge.description}
                                        </p>
                                    </Table.Cell>
                                    <Table.Cell className="min-w-[10rem]">
                                        {new Date(
                                            Number(challenge.updated_at) * 1000
                                        ).toLocaleString()}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Box
                                            className={
                                                "w-full flex justify-center gap-[10px]"
                                            }
                                        >
                                            <Button
                                                variant={"ghost"}
                                                onClick={() =>
                                                    navigate(
                                                        `/settings/challenges/${challenge?.id}`
                                                    )
                                                }
                                                icon={<GalleryEditBold />}
                                                className={
                                                    "h-9 aspect-square p-1"
                                                }
                                            />
                                            <Button
                                                variant={"ghost"}
                                                color={"error"}
                                                onClick={() => {
                                                    setSelectedChallenge(
                                                        challenge
                                                    );
                                                    setChallengeDeleteModalOpen(
                                                        true
                                                    );
                                                }}
                                                icon={<TrashBinTrashBold />}
                                                className={
                                                    "h-9 aspect-square p-1"
                                                }
                                            />
                                        </Box>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </Box>
                <Box
                    className={
                        "flex w-[80%] justify-between items-center gap-[20px]"
                    }
                >
                    <Pagination
                        total={Math.ceil(total / size)}
                        value={page}
                        onChange={(value) => setPage(value)}
                    />
                    <Box className={"flex items-center gap-[10px]"}>
                        <span>每页显示</span>
                        <NumberInput
                            width={"100px"}
                            placeholder={"1"}
                            value={size}
                            onChange={setSize}
                            min={1}
                        />
                    </Box>
                </Box>
            </Box>
            <Dialog
                open={challengeCreateModalOpen}
                onClose={() => setChallengeCreateModalOpen(false)}
            >
                <ChallengeCreateModal />
            </Dialog>
            <Dialog
                open={challengeDeleteModalOpen}
                onClose={() => setChallengeDeleteModalOpen(false)}
            >
                <ChallengeDeleteModal
                    challenge={selectedChallenge}
                    onClose={() => setChallengeDeleteModalOpen(false)}
                />
            </Dialog>
        </>
    );
}
