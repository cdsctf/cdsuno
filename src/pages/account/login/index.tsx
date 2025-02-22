import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LogIn, UserRound, Lock, UserRoundPlus } from "lucide-react";
import { useConfigStore } from "@/storages/config";
import { cn } from "@/utils";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Captcha } from "@/components/widgets/captcha";
import { useState } from "react";
import { login } from "@/api/user";
import { toast } from "sonner";

export default function Index() {
    const configStore = useConfigStore();

    return (
        <div
            className={cn(["flex-1", "flex", "items-center", "justify-center"])}
        >
            <Card
                className={cn(["p-2", "w-[50rem]", "flex", "justify-between"])}
            >
                <div className={cn(["flex-1/2", "flex", "flex-col"])}>
                    <CardHeader>
                        <CardTitle
                            className={cn(["flex", "gap-2", "items-center"])}
                        >
                            <LogIn />
                            登录
                        </CardTitle>
                        <CardDescription>
                            登录以继续浏览 {configStore?.config?.meta?.title}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className={cn(["flex-1"])}>
                        <LoginForm />
                    </CardContent>
                </div>
                <Separator
                    orientation={"vertical"}
                    className={cn(["h-81", "my-auto"])}
                />
                <div className={cn(["flex-1/2", "flex", "flex-col", "p-6"])}>
                    <div
                        className={cn([
                            "flex",
                            "flex-col",
                            "flex-1",
                            "items-center",
                            "justify-center",
                            "select-none",
                        ])}
                    >
                        <img
                            alt="logo"
                            decoding={"async"}
                            src={"/api/configs/icon"}
                            draggable={false}
                            className={cn([
                                "drop-shadow-md",
                                "aspect-square",
                                "h-[10rem]",
                            ])}
                        />
                        <span className={cn(["text-2xl", "font-semibold"])}>
                            {configStore?.config?.meta?.title}
                        </span>
                    </div>
                    <Button
                        className={cn("w-full")}
                        variant={"secondary"}
                        size={"lg"}
                    >
                        <UserRoundPlus />
                        还没有账号？注册！
                    </Button>
                </div>
            </Card>
        </div>
    );
}

function LoginForm() {
    const formSchema = z.object({
        account: z.string({
            message: "请输入用户名",
        }),
        password: z.string({
            message: "请输入密码",
        }),
    });

    const [captcha, setCaptcha] = useState<{
        id?: string;
        content?: string;
    }>();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        login({
            captcha,
            ...values,
        }).then((res) => {
            if (res.code === 200) {
                toast.success("登录成功", {
                    description: `欢迎回来，${res.data?.nickname}！`,
                });
            }
        });
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                autoComplete={"off"}
                className={cn(["flex", "flex-col", "h-full", "gap-8"])}
            >
                <div className={cn("space-y-3", "flex-1")}>
                    <FormField
                        control={form.control}
                        name={"account"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>用户名/邮箱</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={"Account"}
                                        {...field}
                                        icon={<UserRound className="size-4" />}
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
                                        placeholder={"Password"}
                                        icon={<Lock className="size-4" />}
                                        type={"password"}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name={"captcha"}
                        render={() => (
                            <FormItem>
                                <FormLabel>验证码</FormLabel>
                                <Captcha onChange={setCaptcha} />
                            </FormItem>
                        )}
                    />
                </div>
                <Button
                    variant={"solid"}
                    type={"submit"}
                    size={"lg"}
                    className={cn(["w-full"])}
                >
                    登录
                </Button>
            </form>
        </Form>
    );
}
