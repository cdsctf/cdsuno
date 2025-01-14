import { get, update } from "@/api/challenge";
import {
    Box,
    Button,
    Dialog,
    Flex,
    IconButton,
    NumberInput,
    Pagination,
    Stack,
    Switch,
    TextInput,
} from "@/components/core";
import { Table } from "@/components/core/Table";
import { TableBody } from "@/components/core/TableBody/TableBody";
import { TableCell } from "@/components/core/TableCell/TableCell";
import { TableHead } from "@/components/core/TableHead";
import { TableRow } from "@/components/core/TableRow";
import { Challenge } from "@/models/challenge";
import { useSharedStore } from "@/stores/shared";
import { useToastStore } from "@/stores/toast";
import { useEffect, useState } from "react";
import MinimalisticMagniferBoldDuotone from "~icons/solar/minimalistic-magnifer-bold-duotone";
import PenNewSquareBold from "~icons/solar/pen-new-square-bold";
import GalleryEditBold from "~icons/solar/gallery-edit-bold";
import TrashBinTrashBold from "~icons/solar/trash-bin-trash-bold";
import styles from "./index.module.scss";
import { useCategoryStore } from "@/stores/category";
import { ChallengeCreateModal } from "./_blocks/ChallengeCreateModal";

export function Index() {
    const toastStore = useToastStore();
    const sharedStore = useSharedStore();
    const categoryStore = useCategoryStore();

    const [challenges, setChallenges] = useState<Array<Challenge>>();
    const [total, setTotal] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [size, setSize] = useState<number>(7);
    const [sorts, setSorts] = useState<string>("id");
    const [search, setSearch] = useState<string>("");

    const [challengeCreateModalOpen, setChallengeCreateModalOpen] =
        useState<boolean>(false);

    function fetchChallenges() {
        get({
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
        update({
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
            <Stack className={styles["root"]} align={"center"} gap={20}>
                <Flex width={"80%"} gap={20} align={"center"}>
                    <TextInput
                        placeholder={"搜索"}
                        icon={<MinimalisticMagniferBoldDuotone />}
                        value={search}
                        onChange={(value) => setSearch(value)}
                        clearable
                        style={{
                            flex: 1,
                        }}
                    />
                    <Button
                        variant={"solid"}
                        icon={<PenNewSquareBold />}
                        onClick={() => setChallengeCreateModalOpen(true)}
                    >
                        新建题目
                    </Button>
                </Flex>
                <Box className={styles["table"]}>
                    <Table>
                        <TableHead
                            style={{
                                backgroundColor: "var(--color-primary)",
                                color: "#ffffff",
                            }}
                        >
                            <TableRow>
                                <TableCell>公开</TableCell>
                                <TableCell
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
                                >
                                    #
                                </TableCell>
                                <TableCell
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
                                    style={{
                                        width: "200px",
                                    }}
                                >
                                    标题
                                </TableCell>
                                <TableCell
                                    style={{
                                        width: "100px",
                                    }}
                                >
                                    分类
                                </TableCell>
                                <TableCell
                                    style={{
                                        width: "500px",
                                    }}
                                >
                                    描述
                                </TableCell>
                                <TableCell
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
                                </TableCell>
                                <TableCell
                                    justify={"center"}
                                    style={{
                                        width: "100px",
                                    }}
                                >
                                    操作
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {challenges?.map((challenge) => (
                                <TableRow key={challenge.id}>
                                    <TableCell>
                                        <Switch
                                            checked={challenge?.is_public!}
                                            onChange={() => {
                                                handleVisibilityChange(
                                                    challenge
                                                );
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>{challenge.id}</TableCell>
                                    <TableCell>
                                        <p
                                            style={{
                                                maxWidth: "200px",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                                fontWeight: 600,
                                            }}
                                        >
                                            {challenge.title}
                                        </p>
                                    </TableCell>
                                    <TableCell>
                                        <Flex
                                            align={"center"}
                                            gap={5}
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
                                        </Flex>
                                    </TableCell>
                                    <TableCell>
                                        <p
                                            style={{
                                                maxWidth: "500px",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                            }}
                                        >
                                            {challenge.description}
                                        </p>
                                    </TableCell>
                                    <TableCell>
                                        {new Date(
                                            Number(challenge.updated_at) * 1000
                                        ).toLocaleString()}
                                    </TableCell>
                                    <TableCell>
                                        <Flex gap={10}>
                                            <IconButton variant={"ghost"}>
                                                <GalleryEditBold />
                                            </IconButton>
                                            <IconButton
                                                variant={"ghost"}
                                                color={"error"}
                                            >
                                                <TrashBinTrashBold />
                                            </IconButton>
                                        </Flex>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
                <Flex
                    width={"80%"}
                    justify={"space-between"}
                    align={"center"}
                    gap={20}
                >
                    <Pagination
                        total={Math.ceil(total / size)}
                        value={page}
                        onChange={(value) => setPage(value)}
                    />
                    <Flex align={"center"} gap={10}>
                        <span>每页显示</span>
                        <NumberInput
                            width={"100px"}
                            placeholder={"1"}
                            value={size}
                            onChange={setSize}
                            min={1}
                        />
                    </Flex>
                </Flex>
            </Stack>
            <Dialog
                open={challengeCreateModalOpen}
                onClose={() => setChallengeCreateModalOpen(false)}
            >
                <ChallengeCreateModal />
            </Dialog>
        </>
    );
}
