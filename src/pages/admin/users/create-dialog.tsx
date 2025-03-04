import { createUser } from "@/api/user";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useSharedStore } from "@/storages/shared";
import { cn } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
    CheckIcon, 
    PlusCircle, 
    UserIcon, 
    MailIcon, 
    UserCheckIcon, 
    KeyIcon 
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// Define the Group enum
export enum Group {
    Guest = 0,
    Banned = 1,
    User = 2,
    Admin = 3,
}

interface CreateUserDialogProps {
    onClose: () => void;
}

function CreateUserDialog(props: CreateUserDialogProps) {
    const { onClose } = props;

    const sharedStore = useSharedStore();

    const [loading, setLoading] = useState<boolean>(false);

    const formSchema = z.object({
        username: z.string().min(3, { message: "用户名至少3个字符!" }),
        nickname: z.string().min(2, { message: "昵称至少2个字符!" }),
        email: z.string().email({ message: "请输入有效的邮箱地址!" }),
        password: z.string().min(6, { message: "密码至少6个字符!" }),
        group: z.number({
            message: "请选择用户组!",
        }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            group: Group.User,
            username: "",
            nickname: "",
            email: "",
            password: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);
        createUser({
            ...values,
        })
            .then((res) => {
                if (res.code === 200) {
                    toast.success(`用户 ${values.username} 创建成功`);
                    onClose();
                }
            })
            .finally(() => {
                sharedStore.setRefresh();
                setLoading(false);
            });
    }

    // Group options for the select field
    const groupOptions = [
        { id: Group.Guest, name: "访客", icon: UserIcon },
        { id: Group.Banned, name: "封禁", icon: UserIcon },
        { id: Group.User, name: "用户", icon: UserCheckIcon },
        { id: Group.Admin, name: "管理员", icon: UserCheckIcon },
    ];

    return (
        <Card
            className={cn([
                "w-128",
                "min-h-64",
                "p-5",
                "flex",
                "flex-col",
                "gap-5",
            ])}
        >
            <h3 className={cn(["flex", "gap-3", "items-center", "text-md"])}>
                <PlusCircle className={cn(["size-4"])} />
                创建用户
            </h3>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    autoComplete={"off"}
                    className={cn(["flex", "flex-col", "flex-1", "gap-5"])}
                >
                    <FormField
                        control={form.control}
                        name={"username"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>用户名</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        icon={UserIcon}
                                        size={"sm"}
                                        placeholder={"请输入用户名"}
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
                            <FormItem>
                                <FormLabel>昵称</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        icon={UserCheckIcon}
                                        size={"sm"}
                                        placeholder={"请输入昵称"}
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
                                <FormLabel>邮箱</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        icon={MailIcon}
                                        size={"sm"}
                                        type="email"
                                        placeholder={"请输入邮箱地址"}
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
                        name={"password"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>密码</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        icon={KeyIcon}
                                        size={"sm"}
                                        type="password"
                                        placeholder={"请输入密码"}
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
                            <FormItem>
                                <FormLabel>用户组</FormLabel>
                                <FormControl>
                                    <Select
                                        {...field}
                                        icon={UserCheckIcon}
                                        size={"sm"}
                                        options={groupOptions.map((group) => {
                                            const Icon = group.icon;
                                            return {
                                                value: String(group.id),
                                                content: (
                                                    <div
                                                        className={cn([
                                                            "flex",
                                                            "gap-2",
                                                            "items-center",
                                                        ])}
                                                    >
                                                        <Icon className="size-4" />
                                                        {group.name}
                                                    </div>
                                                ),
                                            };
                                        })}
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
                    <Button
                        variant={"solid"}
                        icon={CheckIcon}
                        level={"success"}
                        loading={loading}
                    >
                        确定
                    </Button>
                </form>
            </Form>
        </Card>
    );
}

export { CreateUserDialog };