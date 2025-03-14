import { updateTeam } from "@/api/games/game_id/teams/profile";
import { deleteTeamAvatar } from "@/api/games/game_id/teams/profile/avatar";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Dropzone,
    DropZoneArea,
    DropzoneTrigger,
    useDropzone,
} from "@/components/ui/dropzone";
import { Editor } from "@/components/ui/editor";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGameStore } from "@/storages/game";
import { useSharedStore } from "@/storages/shared";
import { cn } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    CheckIcon,
    MailIcon,
    MessageCircleIcon,
    TrashIcon,
    TypeIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function Index() {
    const sharedStore = useSharedStore();
    const { currentGame, selfTeam } = useGameStore();

    const [loading, setLoading] = useState<boolean>(false);

    const formSchema = z.object({
        name: z.string({
            message: "请输入队名",
        }),
        email: z.string().nullish(),
        description: z.string().nullish(),
        slogan: z.string().nullish(),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: selfTeam,
    });

    useEffect(() => {
        form.reset(selfTeam, {
            keepDefaultValues: false,
        });
    }, [selfTeam, form.reset]);

    function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);
        updateTeam({
            id: selfTeam?.id!,
            game_id: currentGame?.id!,
            ...values,
        })
            .then((res) => {
                if (res.code === 200) {
                    toast.success(`团队 ${res?.data?.name} 更新成功`);
                }
            })
            .finally(() => {
                sharedStore.setRefresh();
                setLoading(false);
            });
    }

    const dropzone = useDropzone({
        validation: {
            accept: {
                "image/*": [".png", ".jpg", ".jpeg", ".webp"],
            },
            maxSize: 3 * 1024 * 1024,
            maxFiles: 1,
        },
        onDropFile: async (file) => {
            const formData = new FormData();
            formData.append("file", file);
            const xhr = new XMLHttpRequest();
            xhr.open(
                "POST",
                `/api/games/${currentGame?.id}/teams/profile/avatar`,
                true
            );
            xhr.upload.onprogress = (event) => {
                if (event.lengthComputable) {
                    const percentComplete = (event.loaded / event.total) * 100;
                    toast.loading(`上传进度 ${percentComplete}%`, {
                        id: "team-avatar-upload",
                    });
                }
            };
            xhr.onload = () => {
                if (xhr.status === 200) {
                    toast.success("头像上传成功", {
                        id: "team-avatar-upload",
                    });
                    sharedStore?.setRefresh();
                } else {
                    toast.error("头像上传失败", {
                        id: "team-avatar-upload",
                        description: xhr.responseText,
                    });
                }
            };
            xhr.onerror = () => {
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
    });

    function handleAvatarDelete() {
        deleteTeamAvatar({
            game_id: currentGame?.id!,
            team_id: selfTeam?.id!,
        })
            .then((res) => {
                if (res.code === 200) {
                    toast.success(`团队 ${selfTeam?.name} 头像删除成功`);
                }
            })
            .finally(() => {
                sharedStore.setRefresh();
            });
    }

    return (
        <div
            className={cn([
                "flex",
                "flex-col",
                "flex-1",
                "p-10",
                "xl:mx-50",
                "lg:mx-30",
            ])}
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    autoComplete={"off"}
                    className={cn(["flex", "flex-col", "flex-1", "gap-8"])}
                >
                    <div className={cn(["flex", "gap-5", "items-center"])}>
                        <div
                            className={cn([
                                "flex",
                                "flex-col",
                                "gap-8",
                                "flex-1",
                            ])}
                        >
                            <FormField
                                control={form.control}
                                name={"name"}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>团队名</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                icon={TypeIcon}
                                                placeholder={"团队名"}
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
                                name={"email"}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>电子邮箱</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                icon={MailIcon}
                                                placeholder={"电子邮箱"}
                                                value={field.value || ""}
                                                onChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div>
                            <div
                                className={cn([
                                    "flex",
                                    "gap-3",
                                    "items-center",
                                    "justify-between",
                                ])}
                            >
                                <Label>头像</Label>
                                <Button
                                    type={"button"}
                                    icon={TrashIcon}
                                    size={"sm"}
                                    level={"error"}
                                    square
                                    onClick={handleAvatarDelete}
                                />
                            </div>
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
                                            src={`/api/games/${currentGame?.id}/teams/${selfTeam?.id}/avatar?refresh=${sharedStore?.refresh}`}
                                            fallback={selfTeam?.name?.charAt(0)}
                                        />
                                    </DropzoneTrigger>
                                </DropZoneArea>
                            </Dropzone>
                        </div>
                    </div>
                    <FormField
                        control={form.control}
                        name={"slogan"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>口号</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        icon={MessageCircleIcon}
                                        placeholder={"口号"}
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
                                <FormLabel>简介</FormLabel>
                                <FormControl>
                                    <Editor
                                        {...field}
                                        lang={"markdown"}
                                        tabSize={4}
                                        showLineNumbers
                                        className={cn(["h-full", "min-h-64"])}
                                        value={field.value || ""}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        size={"lg"}
                        type={"submit"}
                        level={"info"}
                        variant={"solid"}
                        icon={CheckIcon}
                        loading={loading}
                    >
                        保存
                    </Button>
                </form>
            </Form>
        </div>
    );
}
