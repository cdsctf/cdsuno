import Sun2BoldDuotone from "~icons/solar/sun-2-bold-duotone";
import MoonBoldDuotone from "~icons/solar/moon-bold-duotone";
import LogoutLineDuotone from "~icons/solar/logout-linear";
import { Avatar, Box, Button } from "@/components/core";
import { useThemeStore } from "@/stores/theme";
import { useAuthStore } from "@/stores/auth";
import { useNavigate } from "react-router";
import styles from "./Dropdown.module.scss";
import { Card } from "@/components/core/Card";
import clsx from "clsx";

export function Dropdown() {
    const authStore = useAuthStore();
    const navigate = useNavigate();

    return (
        <Card>
            <Box className={"flex flex-col gap-[8px]"}>
                <Button
                    variant={"ghost"}
                    width={"100%"}
                    shadow={"none"}
                    icon={
                        <Avatar
                            src={
                                authStore?.user
                                    ? `/api/users/${authStore?.user?.id}/avatar`
                                    : "/#"
                            }
                            size={2.5}
                        />
                    }
                    onClick={() => {
                        if (authStore?.user) {
                            navigate(`/users/${authStore?.user?.id}`);
                        } else {
                            navigate("/login");
                        }
                    }}
                >
                    <Box className={"flex flex-col w-full gap-[8px]"}>
                        {authStore?.user ? (
                            <>
                                <span>{authStore?.user?.nickname}</span>
                                <span
                                    style={{
                                        fontSize: "12px",
                                    }}
                                >
                                    #{" "}
                                    {authStore?.user?.id
                                        ?.toString(16)
                                        .toUpperCase()
                                        .padStart(6, "0")}
                                </span>
                            </>
                        ) : (
                            <span>请登录</span>
                        )}
                    </Box>
                </Button>
                <Box className={styles["divider"]} />
                <Box
                    className={clsx(styles["features"], "flex flex-col w-full")}
                >
                    <Box
                        className={
                            "flex w-full flex gap-[20px] items-center justify-center"
                        }
                    >
                        <Button
                            variant={"ghost"}
                            onClick={() => {
                                useThemeStore.getState().setDarkMode(false);
                            }}
                            icon={<Sun2BoldDuotone />}
                        />
                        <span>/</span>
                        <Button
                            variant={"ghost"}
                            onClick={() => {
                                useThemeStore.getState().setDarkMode(true);
                            }}
                            icon={<MoonBoldDuotone />}
                        />
                    </Box>
                    {authStore?.user && (
                        <Button
                            width={"100%"}
                            variant={"ghost"}
                            color={"error"}
                            icon={<LogoutLineDuotone />}
                            onClick={() => {
                                authStore?.clear();
                                navigate("/login");
                            }}
                            shadow={"none"}
                        >
                            退出登录
                        </Button>
                    )}
                </Box>
            </Box>
        </Card>
    );
}
