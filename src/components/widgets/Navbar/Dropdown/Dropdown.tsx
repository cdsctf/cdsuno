import Sun2BoldDuotone from "~icons/solar/sun-2-bold-duotone";
import MoonBoldDuotone from "~icons/solar/moon-bold-duotone";
import { Avatar, Button, Stack } from "@/components/core";
import { Flex } from "@/components/core/Flex";
import { useThemeStore } from "@/stores/theme";
import { IconButton } from "@/components/core/IconButton";

export function Dropdown() {
    const darkMode = useThemeStore.getState().darkMode;

    return (
        <Stack
            gap={"15px"}
            style={{
                borderRadius: "8px",
                color: "var(--text-color)",
                zIndex: 1000,
            }}
        >
            <Button variant={"outlined"}>
                <Flex justify={"center"} align={"center"} gap={"15px"}>
                    <Avatar src="https://avatars.githubusercontent.com/u/84963630?v=4" />
                    <span>elabsoak233</span>
                </Flex>
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
        </Stack>
    );
}
