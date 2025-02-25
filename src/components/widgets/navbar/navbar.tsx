import { cn } from "@/utils";
import { Button } from "../../ui/button";
import { House, Flag, Library } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Link, useLocation } from "react-router";
import { useConfigStore } from "@/storages/config";
import { AppearanceDropdown } from "./apperance-dropdown";
import { AuthArea } from "./auth-area";

function Navbar() {
    const location = useLocation();
    const pathname = location.pathname;
    const configStore = useConfigStore();

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
                            icon={House}
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
                            icon={Library}
                        >
                            <Link to={"/playground"}>练习场</Link>
                        </Button>
                        <Button
                            size={"sm"}
                            asChild
                            variant={pathname === "/games" ? "tonal" : "ghost"}
                            className={"font-semibold"}
                            icon={Flag}
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

export { Navbar };
