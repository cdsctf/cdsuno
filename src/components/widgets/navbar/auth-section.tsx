import { logout } from "@/api/user";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/storages/auth";
import { cn } from "@/utils";
import { Avatar } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { LogOut, UserRound } from "lucide-react";
import { useNavigate, Link } from "react-router";

function AuthSection() {
    const navigate = useNavigate();
    const authStore = useAuthStore();

    function handleLogout() {
        logout().then((res) => {
            if (res.code === 200) {
                authStore.setUser(undefined);
                navigate("/account/login");
            }
        });
    }

    if (authStore?.user?.id) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button square>
                        <Avatar
                            className={cn("h-8", "w-8")}
                            src={`/api/users/${authStore?.user?.id}/avatar`}
                            fallback={authStore?.user?.username?.charAt(0)}
                        />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-42">
                    <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        icon={LogOut}
                        className={cn("text-error", "hover:text-error")}
                        onClick={handleLogout}
                    >
                        退出登录
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }

    return (
        <Button asChild icon={UserRound}>
            <Link to={"/account/login"}>登录</Link>
        </Button>
    );
}

export { AuthSection };
