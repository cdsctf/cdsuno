import { cn } from "@/utils";
import { Button } from "../ui/button";
import {
    House,
    Flag,
    Library,
    Brush,
    Sun,
    Moon,
    Eclipse,
    UserRound,
    LogOut,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link, useLocation } from "react-router";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";
import { useThemeStore } from "@/storages/theme";
import { useConfigStore } from "@/storages/config";
import { useAuthStore } from "@/storages/auth";

function Navbar() {
    const location = useLocation();
    const pathname = location.pathname;
    const configStore = useConfigStore();
    const authStore = useAuthStore();

    return (
        <header
            className={cn([
                "sticky",
                "top-0",
                "h-16",
                "bg-card/80",
                "backdrop-blur-xs",
                "select-none",
                "border-b-[1px]",
                "flex",
                "items-center",
                "z-10",
            ])}
        >
            <div
                className={cn([
                    "container",
                    "ml-auto",
                    "mr-auto",
                    "pl-5",
                    "pr-5",
                    "max-w-[1300px]",
                    "flex",
                    "items-center",
                    "justify-between",
                ])}
            >
                <div className={cn(["flex", "gap-10"])}>
                    <Button asChild size={"lg"} className={"px-5"}>
                        <Link
                            to={"/"}
                            className={cn(["flex", "gap-3", "items-center"])}
                        >
                            <Avatar square>
                                <AvatarImage
                                    alt="logo"
                                    width={49}
                                    height={49}
                                    decoding={"async"}
                                    src={"/api/configs/icon"}
                                    className={cn(["drop-shadow-md"])}
                                />
                                <AvatarFallback />
                            </Avatar>
                            <h1 className={cn(["text-xl", "font-semibold"])}>
                                {configStore?.config?.meta?.title}
                            </h1>
                        </Link>
                    </Button>
                    <div
                        className={cn([
                            "hidden",
                            "md:flex",
                            "gap-3",
                            "items-center",
                        ])}
                    >
                        <Button
                            asChild
                            variant={pathname === "/" ? "tonal" : "ghost"}
                            size={"sm"}
                            className={"font-semibold"}
                            icon={<House />}
                        >
                            <Link to={"/"}>主页</Link>
                        </Button>
                        <Button
                            asChild
                            variant={
                                pathname === "/playground" ? "tonal" : "ghost"
                            }
                            size={"sm"}
                            className={"font-semibold"}
                            icon={<Library />}
                        >
                            <Link to={"/playground"}>练习场</Link>
                        </Button>
                        <Button
                            size={"sm"}
                            asChild
                            variant={pathname === "/games" ? "tonal" : "ghost"}
                            className={"font-semibold"}
                            icon={<Flag />}
                        >
                            <Link to={"/games"}>比赛</Link>
                        </Button>
                    </div>
                </div>
                <div className={cn(["flex", "gap-3", "items-center"])}>
                    <AppearanceDropdown />
                    <AuthArea />
                </div>
            </div>
        </header>
    );
}

function AuthArea() {
    const authStore = useAuthStore();

    if (authStore?.user?.id) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button square>
                        <Avatar className={cn("h-8", "w-8")}>
                            <AvatarImage
                                src={`/api/users/${authStore?.user?.id}/avatar`}
                            />
                            <AvatarFallback>
                                {authStore?.user?.username?.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem icon={<LogOut />}>
                        Subscription
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }

    return (
        <Button asChild icon={<UserRound />}>
            <Link to={"/account/login"}>登录</Link>
        </Button>
    );
}

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

export { Navbar };
