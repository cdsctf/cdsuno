import {
    Box,
    Button,
    Select,
    Switch,
    Textarea,
    TextInput,
} from "@/components/core";
import Context from "./Context";
import { useContext, useEffect } from "react";
import { useCategoryStore } from "@/stores/category";
import CheckCircleBold from "~icons/solar/check-circle-bold";
import styles from "./index.module.scss";
import { updateChallenge } from "@/api/challenge";
import { useToastStore } from "@/stores/toast";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import clsx from "clsx";

export function Index() {
    const { challenge, setRefresh } = useContext(Context);
    const categoryStore = useCategoryStore();
    const toastStore = useToastStore();

    const schema = z.object({
        title: z
            .string()
            .min(1, "标题不能为空")
            .max(50, "标题不能超过 50 个字符"),
        category: z.number().int().min(1),
        description: z.string(),
        is_dynamic: z.boolean(),
        has_attachment: z.boolean(),
    });

    type FormData = z.infer<typeof schema>;

    const {
        control,
        setValue,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const formWatch = watch();

    function handleChallengeUpdate(data: FormData) {
        updateChallenge({
            id: challenge?.id,
            title: data.title,
            category: data.category,
            description: data.description,
            is_dynamic: data.is_dynamic,
            has_attachment: data.has_attachment,
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
            setValue("title", challenge.title || "");
            setValue("category", challenge.category || 1);
            setValue("description", challenge.description || "");
            setValue("is_dynamic", challenge.is_dynamic || false);
            setValue("has_attachment", challenge.has_attachment || false);
        }
    }, [challenge]);

    useEffect(() => {
        const handleCtrlS = (event: KeyboardEvent) => {
            if ((event.ctrlKey || event.metaKey) && event.key === "s") {
                event.preventDefault();
                handleChallengeUpdate(formWatch);
            }
        };

        window.addEventListener("keydown", handleCtrlS);
        return () => {
            window.removeEventListener("keydown", handleCtrlS);
        };
    }, [formWatch, challenge?.id]);

    return (
        <form
            className={styles["root"]}
            onSubmit={handleSubmit(handleChallengeUpdate)}
            autoComplete={"off"}
        >
            <Box className={"flex flex-col w-full justify-center flex-1"}>
                <Box
                    className={clsx(
                        styles["form"],
                        "flex flex-col w-full gap-[20px]"
                    )}
                >
                    <Box className={"flex w-full items-center gap-[20px]"}>
                        <Controller
                            name={"title"}
                            control={control}
                            render={({ field }) => (
                                <TextInput
                                    label={"标题"}
                                    helperText={"请输入合适长度的题目标题"}
                                    value={field.value}
                                    onChange={field.onChange}
                                    errorText={errors.title?.message?.toString()}
                                    invalid={!!errors.title}
                                    style={{
                                        flex: 1,
                                    }}
                                />
                            )}
                        />
                        <Controller
                            name={"category"}
                            control={control}
                            render={({ field }) => (
                                <Select
                                    label={"分类"}
                                    helperText={"请为题目选择合适的分类"}
                                    value={String(field.value)}
                                    onChange={(value) => {
                                        field.onChange(Number(value));
                                    }}
                                    options={categoryStore?.categories.map(
                                        (category) => ({
                                            label: (
                                                <Box
                                                    style={{
                                                        color: category?.color,
                                                    }}
                                                    className={
                                                        "flex items-center gap-[10px]"
                                                    }
                                                >
                                                    <Box>{category?.icon}</Box>
                                                    {category.name?.toUpperCase()}
                                                </Box>
                                            ),
                                            value: String(category.id),
                                        })
                                    )}
                                />
                            )}
                        />
                    </Box>
                    <Box className={"flex w-full"}>
                        <Controller
                            name={"description"}
                            control={control}
                            render={({ field }) => (
                                <Textarea
                                    label={"描述"}
                                    helperText={
                                        "请输入题目的详细描述，可使用 Markdown"
                                    }
                                    width={"100%"}
                                    minHeight={"15rem"}
                                    value={field.value}
                                    onChange={field.onChange}
                                    style={{ flex: 1 }}
                                />
                            )}
                        />
                    </Box>
                    <Box className={"flex w-full justify-between"}>
                        <Controller
                            name={"is_dynamic"}
                            control={control}
                            render={({ field }) => (
                                <Switch
                                    label={"是否使用容器"}
                                    checked={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                        <Controller
                            name={"has_attachment"}
                            control={control}
                            render={({ field }) => (
                                <Switch
                                    label={"是否使用容器"}
                                    checked={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                    </Box>
                </Box>
                <Box className={"flex w-full justify-end"}>
                    <Button icon={<CheckCircleBold />} type={"submit"}>
                        保存
                    </Button>
                </Box>
            </Box>
        </form>
    );
}
