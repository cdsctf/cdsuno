import { UserRound, Lock, Check } from "lucide-react";
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
import { useAuthStore } from "@/storages/auth";
import { useNavigate } from "react-router";

function LoginForm() {
    const authStore = useAuthStore();
    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(false);

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
        setLoading(true);
        login({
            captcha,
            ...values,
        })
            .then((res) => {
                if (res.code === 200) {
                    authStore.setUser(res.data);
                    toast.success("登录成功", {
                        id: "login-success",
                        description: `欢迎回来，${res.data?.nickname}！`,
                    });
                    navigate("/");
                }
            })
            .finally(() => {
                setLoading(false);
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
                                        icon={UserRound}
                                        {...field}
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
                                        icon={Lock}
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
                    level={"success"}
                    type={"submit"}
                    size={"lg"}
                    className={cn(["w-full"])}
                    icon={Check}
                    loading={loading}
                >
                    登录
                </Button>
            </form>
        </Form>
    );
}

export { LoginForm };
