import { useContext, useEffect, useState } from "react";
import { Context } from "../context";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/utils";
import { Input } from "@/components/ui/input";
import { updateChallengeEnv } from "@/api/challenge";
import { toast } from "sonner";
import { useSharedStore } from "@/storages/shared";
import {
    Check,
    Clock,
    Container,
    Cpu,
    Key,
    MemoryStick,
    Minus,
    Plus,
    Trash,
} from "lucide-react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function Index() {
    const { challenge } = useContext(Context);
    const sharedStore = useSharedStore();

    const [loading, setLoading] = useState<boolean>(false);

    const formSchema = z.object({
        duration: z.number({
            message: "请输入持续时长",
        }),
        containers: z.array(
            z.object({
                image: z.string({
                    message: "请输入镜像名",
                }),
                cpu_limit: z.number({
                    message: "请输入 CPU 限制参数",
                }),
                memory_limit: z.number({
                    message: "请输入内存限制参数",
                }),
                envs: z.record(z.string()),
                ports: z.array(z.number()),
            })
        ),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            duration: challenge?.env?.duration || 1800,
            containers: challenge?.env?.containers || [],
        },
    });

    useEffect(() => {
        form.reset({
            duration: challenge?.env?.duration || 1800,
            containers: challenge?.env?.containers || [],
        });
    }, [challenge?.env, form]);

    const handleAddContainer = () => {
        const containers = form.getValues("containers") || [];
        form.setValue("containers", [
            ...containers,
            {
                image: "",
                cpu_limit: 1,
                memory_limit: 1024,
                envs: {},
                ports: [],
            },
        ]);
    };

    const handleRemoveContainer = (index: number) => {
        const containers = form.getValues("containers") || [];
        form.setValue(
            "containers",
            containers.filter((_, i) => i !== index)
        );
    };

    const handleAddPort = (containerIndex: number) => {
        const containers = form.getValues("containers") || [];
        const ports = containers[containerIndex]?.ports || [];
        containers[containerIndex].ports = [...ports, 9999];
        form.setValue("containers", containers);
    };

    const handleRemovePort = (containerIndex: number, portIndex: number) => {
        const containers = form.getValues("containers") || [];
        const ports = containers[containerIndex]?.ports || [];
        containers[containerIndex].ports = ports.filter(
            (_, i) => i !== portIndex
        );
        form.setValue("containers", containers);
    };

    const handleAddEnv = (containerIndex: number) => {
        const containers = form.getValues("containers") || [];
        const envs = containers[containerIndex]?.envs || {};
        containers[containerIndex].envs = { ...envs, "": "" };
        form.setValue("containers", containers);
    };

    const handleRemoveEnv = (containerIndex: number, key: string) => {
        const containers = form.getValues("containers") || [];
        const envs = containers[containerIndex]?.envs || {};
        const newEnvs = { ...envs };
        delete newEnvs[key];
        containers[containerIndex].envs = newEnvs;
        form.setValue("containers", containers);
    };

    function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);
        updateChallengeEnv({
            id: challenge?.id,
            env: values,
        })
            .then((res) => {
                if (res.code === 200) {
                    toast.success(`题目 ${challenge?.title} 动态环境更新成功`);
                }
            })
            .finally(() => {
                sharedStore.setRefresh();
                setLoading(false);
            });
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                autoComplete={"off"}
                className={cn(["flex", "flex-col", "flex-1", "gap-8"])}
            >
                <FormField
                    control={form.control}
                    name={"duration"}
                    render={({ field }) => (
                        <FormItem className={cn(["w-full"])}>
                            <FormLabel>持续时间（秒）</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    type={"number"}
                                    icon={Clock}
                                    placeholder={"1800"}
                                    value={field.value || ""}
                                    onChange={(e) =>
                                        field.onChange(Number(e.target.value))
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {form.watch("containers")?.map((container, containerIndex) => (
                    <div
                        key={containerIndex}
                        className={cn([
                            "flex",
                            "flex-col",
                            "gap-5",
                            "border",
                            "p-5",
                            "rounded",
                        ])}
                    >
                        <div className={cn(["flex", "gap-5"])}>
                            <FormField
                                control={form.control}
                                name={`containers.${containerIndex}.image`}
                                render={({ field }) => (
                                    <FormItem className={cn(["w-full"])}>
                                        <FormLabel>镜像名</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                icon={Container}
                                                placeholder={"repository:tag"}
                                                value={field.value || ""}
                                                onChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className={cn(["flex", "gap-5"])}>
                            <FormField
                                control={form.control}
                                name={`containers.${containerIndex}.cpu_limit`}
                                render={({ field }) => (
                                    <FormItem className={cn(["w-1/2"])}>
                                        <FormLabel>CPU 限制</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type={"number"}
                                                icon={Cpu}
                                                placeholder={"2"}
                                                value={field.value || ""}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        Number(e.target.value)
                                                    )
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`containers.${containerIndex}.memory_limit`}
                                render={({ field }) => (
                                    <FormItem className={cn(["w-1/2"])}>
                                        <FormLabel>内存限制（MB）</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type={"number"}
                                                icon={MemoryStick}
                                                placeholder={"2"}
                                                value={field.value || ""}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        Number(e.target.value)
                                                    )
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Label>暴露端口</Label>
                        <div className={cn(["grid", "grid-cols-4", "gap-5"])}>
                            {container.ports?.map((_port, portIndex) => (
                                <FormField
                                    key={portIndex}
                                    control={form.control}
                                    name={`containers.${containerIndex}.ports.${portIndex}`}
                                    render={({ field }) => (
                                        <FormItem
                                            className={cn([
                                                "flex-1",
                                                "flex",
                                                "flex-col",
                                            ])}
                                        >
                                            <FormControl>
                                                <div
                                                    className={cn([
                                                        "flex",
                                                        "items-center",
                                                        "gap-3",
                                                    ])}
                                                >
                                                    <Input
                                                        {...field}
                                                        type={"number"}
                                                        icon={MemoryStick}
                                                        size={"sm"}
                                                        placeholder={"2"}
                                                        value={
                                                            field.value || ""
                                                        }
                                                        onChange={(e) =>
                                                            field.onChange(
                                                                Number(
                                                                    e.target
                                                                        .value
                                                                )
                                                            )
                                                        }
                                                        className={cn([
                                                            "flex-1",
                                                        ])}
                                                    />
                                                    <Button
                                                        type={"button"}
                                                        icon={Minus}
                                                        size={"sm"}
                                                        square
                                                        onClick={() =>
                                                            handleRemovePort(
                                                                containerIndex,
                                                                portIndex
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            ))}
                            <Button
                                type={"button"}
                                size={"sm"}
                                icon={Plus}
                                className={cn(["self-center"])}
                                square
                                onClick={() => handleAddPort(containerIndex)}
                            />
                        </div>
                        <Label>环境变量</Label>
                        <div className={cn(["grid", "grid-cols-2", "gap-5"])}>
                            {container.envs &&
                                Object.keys(container.envs).map(
                                    (key, envIndex) => (
                                        <div
                                            key={envIndex}
                                            className={cn([
                                                "flex",
                                                "items-center",
                                                "gap-3",
                                            ])}
                                        >
                                            <Input
                                                value={key}
                                                placeholder="键"
                                                icon={Key}
                                                size={"sm"}
                                                onChange={(e) => {
                                                    const newKey =
                                                        e.target.value;
                                                    const envs =
                                                        form.getValues(
                                                            `containers.${containerIndex}.envs`
                                                        ) || {};
                                                    const value = envs[key];
                                                    const newEnvs = { ...envs };
                                                    delete newEnvs[key];
                                                    newEnvs[newKey] = value;
                                                    form.setValue(
                                                        `containers.${containerIndex}.envs`,
                                                        newEnvs
                                                    );
                                                }}
                                                className={cn(["flex-1/2"])}
                                            />
                                            <Input
                                                value={container.envs[key]}
                                                placeholder="值"
                                                size={"sm"}
                                                onChange={(e) => {
                                                    const newValue =
                                                        e.target.value;
                                                    const envs =
                                                        form.getValues(
                                                            `containers.${containerIndex}.envs`
                                                        ) || {};
                                                    form.setValue(
                                                        `containers.${containerIndex}.envs`,
                                                        {
                                                            ...envs,
                                                            [key]: newValue,
                                                        }
                                                    );
                                                }}
                                                className={cn(["flex-1/2"])}
                                            />
                                            <Button
                                                type={"button"}
                                                icon={Minus}
                                                size={"sm"}
                                                square
                                                onClick={() =>
                                                    handleRemoveEnv(
                                                        containerIndex,
                                                        key
                                                    )
                                                }
                                            />
                                        </div>
                                    )
                                )}
                            <Button
                                type={"button"}
                                size={"sm"}
                                icon={Plus}
                                className={cn(["self-center"])}
                                square
                                onClick={() => handleAddEnv(containerIndex)}
                            />
                        </div>
                        <Button
                            type={"button"}
                            variant={"tonal"}
                            level={"error"}
                            size={"sm"}
                            icon={Trash}
                            onClick={() =>
                                handleRemoveContainer(containerIndex)
                            }
                        >
                            删除容器
                        </Button>
                    </div>
                ))}
                <Button
                    type={"button"}
                    variant={"tonal"}
                    size={"sm"}
                    icon={Plus}
                    onClick={handleAddContainer}
                >
                    添加容器
                </Button>
                <Button
                    variant={"solid"}
                    level={"info"}
                    type={"submit"}
                    size={"lg"}
                    className={cn(["w-full"])}
                    icon={Check}
                    loading={loading}
                >
                    保存
                </Button>
            </form>
        </Form>
    );
}
