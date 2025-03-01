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
        image: z.string({
            message: "请输入镜像名",
        }),
        cpu_limit: z.number({
            message: "请输入 CPU 限制参数",
        }),
        memory_limit: z.number({
            message: "请输入内存限制参数",
        }),
        duration: z.number({
            message: "请输入持续时长",
        }),
        envs: z.record(z.string()),
        ports: z.array(z.number()),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: challenge?.env,
    });

    const ports = form.watch("ports");
    const envs = form.watch("envs");

    useEffect(() => {
        form.reset(challenge?.env, {
            keepDefaultValues: false,
        });
    }, [challenge?.env, form.reset]);

    const handleAddPort = () => {
        const ports = form.getValues("ports") || [];
        form.setValue("ports", [...ports, 9999]);
    };

    const handleRemovePort = (index: number) => {
        const ports = form.getValues("ports") || [];
        form.setValue(
            "ports",
            ports.filter((_, i) => i !== index)
        );
    };

    const handleAddEnv = () => {
        const envs = form.getValues("envs") || {};
        form.setValue("envs", { ...envs, "": "" });
    };

    const handleRemoveEnv = (key: string) => {
        const envs = form.getValues("envs") || {};
        const newEnvs = { ...envs };
        delete newEnvs[key];
        form.setValue("envs", newEnvs);
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
                <div className={cn(["flex", "gap-5"])}>
                    <FormField
                        control={form.control}
                        name={"image"}
                        render={({ field }) => (
                            <FormItem className={cn(["w-3/4"])}>
                                <FormLabel>镜像名</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        icon={Container}
                                        placeholder={"nginx:latest"}
                                        value={field.value || ""}
                                        onChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={"duration"}
                        render={({ field }) => (
                            <FormItem className={cn(["w-1/4"])}>
                                <FormLabel>持续时间（秒）</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type={"number"}
                                        icon={Clock}
                                        placeholder={"1800"}
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
                        name={"cpu_limit"}
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
                                        onChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={"memory_limit"}
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
                                        onChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Label>暴露端口</Label>
                <div className={cn(["grid", "grid-cols-4", "gap-5"])}>
                    {ports?.map((_port, index) => (
                        <FormField
                            key={index}
                            control={form.control}
                            name={`ports.${index}`}
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
                                                value={field.value || ""}
                                                onChange={field.onChange}
                                                className={cn(["flex-1"])}
                                            />
                                            <Button
                                                type={"button"}
                                                icon={Minus}
                                                size={"sm"}
                                                square
                                                onClick={() =>
                                                    handleRemovePort(index)
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
                        onClick={() => handleAddPort()}
                    />
                </div>
                <Label>环境变量</Label>
                <div className={cn(["grid", "grid-cols-2", "gap-5"])}>
                    {envs &&
                        Object.keys(envs).map((key, index) => (
                            <div
                                key={index}
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
                                        const newKey = e.target.value;
                                        const envs =
                                            form.getValues("envs") || {};
                                        const value = envs[key];
                                        const newEnvs = { ...envs };
                                        delete newEnvs[key];
                                        newEnvs[newKey] = value;
                                        form.setValue("envs", newEnvs);
                                    }}
                                    className={cn(["flex-1/2"])}
                                />
                                <Input
                                    value={envs[key]}
                                    placeholder="值"
                                    size={"sm"}
                                    onChange={(e) => {
                                        const newValue = e.target.value;
                                        const envs =
                                            form.getValues("envs") || {};
                                        form.setValue("envs", {
                                            ...envs,
                                            [key]: newValue,
                                        });
                                    }}
                                    className={cn(["flex-1/2"])}
                                />
                                <Button
                                    type={"button"}
                                    icon={Minus}
                                    size={"sm"}
                                    square
                                    onClick={() => handleRemoveEnv(key)}
                                />
                            </div>
                        ))}
                    <Button
                        type={"button"}
                        size={"sm"}
                        icon={Plus}
                        className={cn(["self-center"])}
                        square
                        onClick={() => handleAddEnv()}
                    />
                </div>
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
