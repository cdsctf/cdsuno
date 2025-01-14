import {
    Box,
    Flex,
    IconButton,
    Select,
    Stack,
    TextInput,
} from "@/components/core";
import PenNewSquareBold from "~icons/solar/pen-new-square-bold";
import LinkCircleBold from "~icons/solar/link-circle-bold";
import ArrowRightLinear from "~icons/solar/arrow-right-linear";
import styles from "./ChallengeCreateModal.module.scss";
import { useState } from "react";
import { useCategoryStore } from "@/stores/category";

export function ChallengeCreateModal() {
    const categoryStore = useCategoryStore();

    const [title, setTitle] = useState<string>("");
    const [category, setCategory] = useState<number>(1);

    return (
        <Stack className={styles["root"]}>
            <Stack width={"100%"}>
                <Flex
                    align={"center"}
                    gap={5}
                    style={{
                        color: "light-dark(var(--color-primary), #ffffff)",
                    }}
                >
                    <Box style={{ fontSize: "1.125rem" }}>
                        <PenNewSquareBold />
                    </Box>
                    <h2 style={{ fontSize: "0.95rem" }}>
                        提供必要的信息以新建题目
                    </h2>
                </Flex>
                <Flex align={"center"} gap={10}>
                    <TextInput
                        label={"标题"}
                        helperText={"请输入合适长度的题目标题"}
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
                                    {category.name}
                                </Flex>
                            ),
                            value: String(category.id),
                        }))}
                    />
                </Flex>
                <Box className={styles["divider"]} />
                <Flex
                    align={"center"}
                    gap={5}
                    style={{
                        color: "light-dark(var(--color-primary), #ffffff)",
                    }}
                >
                    <Box style={{ fontSize: "1.125rem" }}>
                        <LinkCircleBold />
                    </Box>
                    <h2 style={{ fontSize: "0.95rem" }}>
                        或者使用分享链接以导入题目
                    </h2>
                </Flex>
                <Flex width={"100%"} gap={10} align={"center"}>
                    <TextInput
                        disabled
                        style={{
                            flex: 1,
                        }}
                    />
                    <IconButton disabled>
                        <ArrowRightLinear />
                    </IconButton>
                </Flex>
            </Stack>
        </Stack>
    );
}
