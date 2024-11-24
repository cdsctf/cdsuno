import styles from "./Login.module.scss";
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

export function Login() {
    const authStore = useAuthStore();
    const categoryStore = useCategoryStore();
    const toastStore = useToastStore();
    const navigate = useNavigate();

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

    const variables = {
        "--category-bg-color": bgColors[index],
    } as CSSProperties;

    return (
        <div className={styles["root"]} style={variables}>
            <div className={styles["category"]}>
                <div className={styles["icon"]}>{categories[index].icon}</div>
            </div>
            <div className={styles["main"]}>
                <h1 className={styles["title"]}>登录</h1>
                <form
                    className={styles["form"]}
                    onSubmit={(e) => e.preventDefault()}
                >
                    <TextInput
                        width="100%"
                        placeholder="Username"
                        label={"用户名"}
                        icon={<UserBold />}
                        value={account}
                        onChange={(value) => setAccount(value)}
                    />
                    <TextInput
                        width="100%"
                        placeholder="Password"
                        label={"密码"}
                        icon={<LockPasswordBold />}
                        password
                        value={password}
                        onChange={(value) => setPassword(value)}
                    />
                    <Button
                        width="100%"
                        icon={<LoginBold />}
                        style={{
                            margin: "1rem 0",
                        }}
                        onClick={handleLogin}
                        loading={loading}
                    >
                        登录
                    </Button>
                </form>
            </div>
        </div>
    );
}
