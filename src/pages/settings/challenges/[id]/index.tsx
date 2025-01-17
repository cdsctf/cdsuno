import {
    Box,
    Button,
    Flex,
    Grid,
    Select,
    Stack,
    Switch,
    Textarea,
    TextInput,
} from "@/components/core";
import Context from "./Context";
import { useContext, useEffect, useState } from "react";
import { useCategoryStore } from "@/stores/category";
import CheckCircleBold from "~icons/solar/check-circle-bold";
import styles from "./index.module.scss";
import { updateChallenge } from "@/api/challenge";
import { useToastStore } from "@/stores/toast";
import { Divider } from "@/components/core/Divider";

export function Index() {
    const { challenge, setRefresh } = useContext(Context);
    const categoryStore = useCategoryStore();
    const toastStore = useToastStore();

    const [title, setTitle] = useState<string>();
    const [category, setCategory] = useState<number>();
    const [description, setDescription] = useState<string>();
    const [isDynamic, setIsDynamic] = useState<boolean>();
    const [hasAttachment, setHasAttachment] = useState<boolean>();

    function handleChallengeUpdate() {
        updateChallenge({
            id: challenge?.id,
            title: title,
            category: category,
            description: description,
            is_dynamic: isDynamic,
            has_attachment: hasAttachment,
        })
            .then((res) => {
                const code = res.code;
                const data = res.data;
                switch (code) {
                    case 200:
                        toastStore.add({
                            type: "success",
                            title: "成功",
                            description: `题目 ${data?.title} 更新成功`,
                        });
                        break;
                    default:
                        toastStore.add({
                            type: "error",
                            title: "失败",
                            description: `题目更新失败`,
                        });
                }
            })
            .finally(() => {
                setRefresh?.();
            });
    }

    useEffect(() => {
        if (challenge) {
            setTitle(challenge.title);
            setCategory(challenge.category);
            setDescription(challenge.description);
            setIsDynamic(challenge.is_dynamic);
            setHasAttachment(challenge.has_attachment);
        }
    }, [challenge]);

    return (
        <Stack
            className={styles["root"]}
            width={"100%"}
            justify={"space-between"}
        >
            <Stack className={styles["form"]} width={"100%"} gap={20}>
                <Flex width={"100%"} align={"center"} gap={20}>
                    <TextInput
                        label={"标题"}
                        helperText={"请输入合适长度的题目标题"}
                        value={title}
                        onChange={setTitle}
                        style={{
                            flex: 1,
                        }}
                    />
                    <Select
                        label={"分类"}
                        helperText={"请为题目选择合适的分类"}
                        value={String(category)}
                        onChange={(value) => setCategory(Number(value))}
                        options={categoryStore?.categories.map((category) => ({
                            label: (
                                <Flex
                                    align={"center"}
                                    gap={10}
                                    style={{
                                        color: category?.color,
                                    }}
                                >
                                    <Box>{category?.icon}</Box>
                                    {category.name?.toUpperCase()}
                                </Flex>
                            ),
                            value: String(category.id),
                        }))}
                    />
                </Flex>
                <Flex width={"100%"}>
                    <Textarea
                        label={"描述"}
                        helperText={"请输入题目的详细描述，可使用 Markdown"}
                        width={"100%"}
                        minHeight={"15rem"}
                        value={description}
                        onChange={setDescription}
                        style={{ flex: 1 }}
                    />
                </Flex>
                <Flex width={"100%"} justify={"space-between"}>
                    <Switch
                        label={"是否使用容器"}
                        checked={Boolean(isDynamic)}
                        onChange={setIsDynamic}
                    />
                    <Switch
                        label={"是否提供附件"}
                        checked={Boolean(hasAttachment)}
                        onChange={setHasAttachment}
                    />
                </Flex>
            </Stack>
            <Flex width={"100%"} justify={"flex-end"}>
                <Button
                    icon={<CheckCircleBold />}
                    onClick={handleChallengeUpdate}
                >
                    保存
                </Button>
            </Flex>
        </Stack>
    );
}
