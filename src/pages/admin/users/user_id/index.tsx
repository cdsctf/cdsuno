import {
    Dropzone,
    DropZoneArea,
    DropzoneTrigger,
    useDropzone,
} from "@/components/ui/dropzone";
import { User, Group } from "@/models/user";
import {
    KeyIcon,
    UserRoundIcon,
    MailIcon,
    SaveIcon,
    UserRoundCheckIcon,
    ShieldIcon,
    UserRoundXIcon,
    Type,
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Context } from "./context";
import { updateUser } from "@/api/users/user_id";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Select } from "@/components/ui/select";
import { Editor } from "@/components/ui/editor";
import { Avatar } from "@/components/ui/avatar";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSharedStore } from "@/storages/shared";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

export default function Index() {
    const { user } = useContext(Context);
    const sharedStore = useSharedStore();
    const [loading, setLoading] = useState<boolean>(false);
    const [refresh, setRefresh] = useState<number>(0);

    const groupOptions = [
        { id: Group.Guest.toString(), name: "访客", icon: UserRoundIcon },
        { id: Group.Banned.toString(), name: "封禁", icon: UserRoundXIcon },
        { id: Group.User.toString(), name: "用户", icon: UserRoundCheckIcon },
        { id: Group.Admin.toString(), name: "管理员", icon: ShieldIcon },
    ];

    const formSchema = z.object({
        username: z.string({}),
        nickname: z.string({
            message: "请输入昵称",
        }),
        group: z.number({
            message: "请选择用户组",
        }),
        description: z.string({
            message: "请输入描述",
        }),
        email: z
            .string({
                message: "请输入邮箱",
            })
            .email({
                message: "邮箱不合法",
            }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: user,
    });

    useEffect(() => {
        form.reset(user, {
            keepDefaultValues: false,
        });
    }, [user, form.reset]);

    function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);
        updateUser({
            id: user?.id!,
            ...values,
        })
            .then((res) => {
                if (res.code === 200) {
                    toast.success(`用户 ${res?.data?.username} 更新成功`);
                }
            })
            .finally(() => {
                sharedStore.setRefresh();
                setLoading(false);
            });
    }

    const dropzone = useDropzone({
        onDropFile: async (file) => {
            if (!user?.id) return { status: "error", error: "用户 ID 不存在" };

            const formData = new FormData();
            formData.append("file", file);

            const xhr = new XMLHttpRequest();
            xhr.open("POST", `/api/users/${user.id}/avatar`, true);

            xhr.upload.onprogress = (event) => {
                if (event.lengthComputable) {
                    const percentComplete = (event.loaded / event.total) * 100;
                    toast.loading(`上传进度 ${percentComplete.toFixed(0)}%`, {
                        id: "avatar-upload",
                    });
                }
            };

            xhr.onload = () => {
                if (xhr.status === 200) {
                    toast.success("头像上传成功", {
                        id: "avatar-upload",
                    });
                    setRefresh((prev) => prev + 1);
                } else {
                    toast.error("头像上传失败", {
                        id: "avatar-upload",
                        description: xhr.responseText,
                    });
                }
            };

            xhr.onerror = () => {
                toast.error("头像上传失败", {
                    id: "avatar-upload",
                    description: "网络错误",
                });
                return {
                    status: "error",
                };
            };

            xhr.send(formData);

            return {
                status: "success",
                result: "",
            };
        },
        validation: {
            accept: {
                "image/*": [".png", ".jpg", ".jpeg", ".webp"],
            },
            maxSize: 3 * 1024 * 1024,
            maxFiles: 1,
        },
    });

    return (
        <div className={cn(["flex", "flex-col", "gap-6", "flex-1"])}>
            <div className={cn(["flex", "flex-col", "items-center", "gap-4"])}>
                <Dropzone {...dropzone}>
                    <DropZoneArea
                        className={cn([
                            "relative",
                            "aspect-square",
                            "h-36",
                            "p-0",
                            "rounded-full",
                            "overflow-hidden",
                        ])}
                    >
                        <DropzoneTrigger
                            className={cn([
                                "bg-transparent",
                                "text-center",
                                "h-full",
                                "aspect-square",
                            ])}
                        >
                            <Avatar
                                className={cn(["h-30", "w-30"])}
                                src={`/api/users/${user?.id}/avatar?refresh=${refresh}`}
                                fallback={user?.username?.charAt(0)}
                            />
                        </DropzoneTrigger>
                    </DropZoneArea>
                </Dropzone>
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    autoComplete={"off"}
                    className={cn(["flex", "flex-col", "flex-1", "gap-8"])}
                >
                    <div
                        className={cn([
                            "grid",
                            "grid-cols-1",
                            "md:grid-cols-3",
                            "gap-4",
                        ])}
                    >
                        <FormField
                            control={form.control}
                            name={"username"}
                            render={({ field }) => (
                                <FormItem className={cn(["w-full"])}>
                                    <FormLabel>用户名</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            icon={UserRoundIcon}
                                            placeholder="请输入用户名"
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
                            name={"nickname"}
                            render={({ field }) => (
                                <FormItem className={cn(["w-full"])}>
                                    <FormLabel>昵称</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            icon={UserRoundIcon}
                                            placeholder="请输入昵称"
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
                            name={"group"}
                            render={({ field }) => (
                                <FormItem className={cn(["w-full"])}>
                                    <FormLabel>用户组</FormLabel>
                                    <FormControl>
                                        <Select
                                            {...field}
                                            icon={ShieldIcon}
                                            options={groupOptions.map(
                                                (group) => ({
                                                    value: group.id,
                                                    content: (
                                                        <div
                                                            className={cn([
                                                                "flex",
                                                                "gap-2",
                                                                "items-center",
                                                            ])}
                                                        >
                                                            <group.icon className="size-4" />
                                                            {group.name}
                                                        </div>
                                                    ),
                                                })
                                            )}
                                            onValueChange={(value) => {
                                                field.onChange(Number(value));
                                            }}
                                            value={String(field.value)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name={"email"}
                        render={({ field }) => (
                            <FormItem className={cn(["w-full"])}>
                                <FormLabel>邮箱</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        icon={MailIcon}
                                        type="email"
                                        placeholder="请输入邮箱"
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
                        name={"description"}
                        render={({ field }) => (
                            <FormItem
                                className={cn(["flex-1", "flex", "flex-col"])}
                            >
                                <FormLabel>描述</FormLabel>
                                <FormControl>
                                    <Editor
                                        {...field}
                                        className={cn(["h-full", "min-h-64"])}
                                        lang="markdown"
                                        tabSize={2}
                                        showLineNumbers
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        size={"lg"}
                        variant={"solid"}
                        level={"primary"}
                        type={"submit"}
                        icon={SaveIcon}
                        loading={loading}
                        className={cn(["w-full"])}
                    >
                        保存
                    </Button>
                </form>
            </Form>
        </div>
    );
}
