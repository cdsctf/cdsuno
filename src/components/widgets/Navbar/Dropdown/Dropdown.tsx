import Sun2BoldDuotone from "~icons/solar/sun-2-bold-duotone";
import MoonBoldDuotone from "~icons/solar/moon-bold-duotone";
import LogoutLineDuotone from "~icons/solar/logout-linear";
import { Avatar, Button, Stack } from "@/components/core";
import { Flex } from "@/components/core/Flex";
import { useThemeStore } from "@/stores/theme";
import { IconButton } from "@/components/core/IconButton";
import { useAuthStore } from "@/stores/auth";
import { useNavigate } from "react-router";

export function Dropdown() {
    const authStore = useAuthStore();
    const navigate = useNavigate();

    return (
        <Stack
            gap={"15px"}
            style={{
                borderRadius: "8px",
                color: "var(--text-color)",
                zIndex: 1000,
                minWidth: "200px",
            }}
        >
            <Button
                variant={"tonal"}
                width={"100%"}
                radius={20}
                icon={
                    <Avatar
                        src={
                            authStore?.user
                                ? `/api/users/${authStore?.user?.id}/avatar`
                                : ""
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
                <Stack gap={0} width={"100%"}>
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
                </Stack>
            </Button>
            <Flex
                gap={"20px"}
                align={"center"}
                justify={"center"}
                style={{
                    width: "100%",
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                    borderRadius: "8px",
                    padding: "2.5px 0px",
                }}
            >
                <IconButton
                    variant={"ghost"}
                    onClick={() => {
                        useThemeStore.getState().setDarkMode(false);
                    }}
                >
                    <Sun2BoldDuotone />
                </IconButton>
                <span>/</span>
                <IconButton
                    variant={"ghost"}
                    onClick={() => {
                        useThemeStore.getState().setDarkMode(true);
                    }}
                >
                    <MoonBoldDuotone />
                </IconButton>
            </Flex>
            {authStore?.user && (
                <Button
                    width={"100%"}
                    variant={"solid"}
                    color={"error"}
                    icon={<LogoutLineDuotone />}
                    onClick={() => authStore?.clear()}
                >
                    退出登录
                </Button>
            )}
        </Stack>
    );
}
