import { useCategoryStore } from "@/stores/category";
import { CSSProperties, useEffect, useState } from "react";
import { Button, TextInput } from "@/components/core";
import UserBold from "~icons/solar/user-bold";
import LockPasswordBold from "~icons/solar/lock-password-bold";
import LoginBold from "~icons/solar/login-bold";
import useThemeColor from "@/hooks/useThemeColor";
import { login } from "@/api/user";
import { useAuthStore } from "@/stores/auth";
import { useNavigate } from "react-router";
import { useToastStore } from "@/stores/toast";
import { useSharedStore } from "@/stores/shared";
import clsx from "clsx";

export function Index() {
    const authStore = useAuthStore();
    const categoryStore = useCategoryStore();
    const toastStore = useToastStore();
    const navigate = useNavigate();
    const sharedStore = useSharedStore();

    const categories = categoryStore.categories;

    const [index, setIndex] = useState<number>(0);

    let bgColors: Array<string> = categories.map((category) =>
        useThemeColor(category.color!)
    );

    const [account, setAccount] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    async function handleLogin() {
        setLoading(true);
        const res = await login({ account, password });
        const code = res?.code;
        switch (code) {
            case 200:
                const user = res?.data;
                authStore.setUser(user);
                toastStore.add({
                    title: "登录成功",
                    description: `欢迎你 ${user?.nickname}`,
                    type: "success",
                    duration: 3000,
                });
                navigate("/");
        }
        setLoading(false);
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            setIndex((prev) => (prev + 1) % categories.length);
        }, 5000);

        return () => clearInterval(intervalId);
    }, [categories]);

    useEffect(() => {
        document.title = `登录 - ${sharedStore?.config?.site?.title}`;
    }, [sharedStore?.config?.site?.title]);

    const variables = {
        "--category-bg-color": bgColors[index],
    } as CSSProperties;

    return (
        <div className={"flex h-[calc(100vh-64px)]"} style={variables}>
            <div
                className={clsx(
                    "h-full w-0 xl:w-3/5 relative bg-[var(--category-bg-color)]",
                    "transition-background-color duration-2000 ease-in-out"
                )}
            >
                <div
                    className={clsx(
                        "absolute top-1/2 left-1/2 -translate-1/2 w-[27.5%] h-[27.5%]",
                        "flex justify-center items-center text-[white]"
                    )}
                >
                    {categories[index].icon}
                </div>
            </div>
            <div
                className={
                    "w-full xl:w-2/5 h-full flex flex-col justify-center items-center"
                }
            >
                <h1 className={"text-[2rem] font-semibold m-[15px]"}>登录</h1>
                <form
                    className={"flex flex-col gap-[0.5rem]"}
                    onSubmit={(e) => e.preventDefault()}
                >
                    <TextInput
                        placeholder="Username"
                        label={"用户名"}
                        icon={<UserBold />}
                        value={account}
                        onChange={(value) => setAccount(value)}
                        className="w-full"
                    />
                    <TextInput
                        placeholder="Password"
                        label={"密码"}
                        icon={<LockPasswordBold />}
                        password
                        value={password}
                        onChange={(value) => setPassword(value)}
                        className="w-full"
                    />
                    <Button
                        icon={<LoginBold />}
                        onClick={handleLogin}
                        loading={loading}
                        className="w-full my-[1rem]"
                    >
                        登录
                    </Button>
                </form>
            </div>
        </div>
    );
}
