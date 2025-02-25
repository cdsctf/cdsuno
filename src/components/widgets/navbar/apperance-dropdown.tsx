import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useThemeStore } from "@/storages/theme";
import { cn } from "@/utils";
import { Brush, Sun, Moon, Eclipse } from "lucide-react";

function AppearanceDropdown() {
    const { setTheme } = useThemeStore();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"ghost"} square size={"sm"}>
                    <Brush />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={"w-36"}>
                <div className={cn(["flex", "h-9", "justify-between"])}>
                    <Button
                        size={"sm"}
                        square
                        onClick={() => setTheme("light")}
                    >
                        <Sun />
                    </Button>
                    <Separator orientation="vertical" />
                    <Button size={"sm"} square onClick={() => setTheme("dark")}>
                        <Moon />
                    </Button>
                    <Separator orientation="vertical" />
                    <Button
                        size={"sm"}
                        square
                        onClick={() => setTheme("system")}
                    >
                        <Eclipse />
                    </Button>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export { AppearanceDropdown };
