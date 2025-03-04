import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSharedStore } from "@/storages/shared";
import { cn } from "@/utils";
import { InfoIcon, LockIcon, UserRoundXIcon } from "lucide-react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";

export default function Layout() {
    const sharedStore = useSharedStore();
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;

    const options = [
        {
            link: `/account/settings`,
            name: "基本信息",
            icon: InfoIcon,
        },
        {
            link: `/account/settings/password`,
            name: "修改密码",
            icon: LockIcon,
        },
    ];

    return (
        <div className={cn(["flex", "flex-1"])}>
            <div
                className={cn([
                    "hidden",
                    "lg:w-1/5",
                    "bg-card/30",
                    "backdrop-blur-sm",
                    "p-5",
                    "lg:flex",
                    "flex-col",
                    "gap-3",
                    "border-r-1",
                ])}
            >
                {options?.map((option, index) => (
                    <Button
                        key={index}
                        size={"lg"}
                        className={cn(["justify-start"])}
                        icon={option.icon}
                        variant={pathname === option.link ? "tonal" : "ghost"}
                        asChild
                    >
                        <Link to={option.link}>{option.name}</Link>
                    </Button>
                ))}
                <Separator />
                <Button
                    size={"lg"}
                    className={cn(["justify-start"])}
                    icon={UserRoundXIcon}
                    level={"error"}
                    variant={
                        pathname === "/account/settings/delete"
                            ? "tonal"
                            : "ghost"
                    }
                    asChild
                >
                    <Link to={"/account/settings/delete"}>注销账号</Link>
                </Button>
            </div>
            <div className={cn(["flex-1", "flex", "flex-col"])}>
                <Outlet />
            </div>
        </div>
    );
}
