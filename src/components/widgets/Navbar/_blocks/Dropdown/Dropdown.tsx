import Sun2BoldDuotone from "~icons/solar/sun-2-bold-duotone";
import MoonBoldDuotone from "~icons/solar/moon-bold-duotone";
import LogoutLineDuotone from "~icons/solar/logout-linear";
import { Avatar, Box, Button } from "@/components/core";
import { useThemeStore } from "@/stores/theme";
import { useAuthStore } from "@/stores/auth";
import { useNavigate } from "react-router";
import { Card } from "@/components/core/Card";
import { Divider } from "@/components/core/Divider";

export function Dropdown() {
    const authStore = useAuthStore();
    const navigate = useNavigate();

    return (
        <Card>
            <Box className={"flex flex-col gap-[8px]"}>
                <Button
                    variant={"ghost"}
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
                    className={"w-full py-7"}
                >
                    <Box className={"flex flex-col w-full"}>
                        {authStore?.user ? (
                            <>
                                <span>{authStore?.user?.nickname}</span>
                                <span className={"text-[12px]"}>
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
                <Divider />
                <Box className={"flex flex-col w-full"}>
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
                            variant={"ghost"}
                            color={"error"}
                            icon={<LogoutLineDuotone />}
                            onClick={() => {
                                authStore?.clear();
                                navigate("/login");
                            }}
                            className="w-full"
                        >
                            退出登录
                        </Button>
                    )}
                </Box>
            </Box>
        </Card>
    );
}
