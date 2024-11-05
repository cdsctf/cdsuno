import styles from "./page.module.scss";
import { useCategoryStore } from "@/stores/category";
import { CSSProperties, useEffect, useState } from "react";
import { Button, TextInput } from "@/components/core";
import UserBold from "~icons/solar/user-bold";
import LockPasswordBold from "~icons/solar/lock-password-bold";
import LoginBold from "~icons/solar/login-bold";
import useThemeColor from "@/hooks/useThemeColor";

export function Page() {
    const categoryStore = useCategoryStore();

    const categories = categoryStore.categories;

    const [index, setIndex] = useState<number>(0);

    let bgColors: Array<string> = categories.map((category) =>
        useThemeColor(category.color!)
    );

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

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
                        value={username}
                        onChange={(value) => setUsername(value)}
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
                    >
                        登录
                    </Button>
                </form>
            </div>
        </div>
    );
}
