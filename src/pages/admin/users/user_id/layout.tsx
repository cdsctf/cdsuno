import { Link, Outlet, useLocation, useParams } from "react-router";
import { Context } from "./context";
import { useEffect, useMemo, useState } from "react";
import { User } from "@/models/user";
import { getUsers } from "@/api/user";
import { Card } from "@/components/ui/card";
import { cn } from "@/utils";
import { Button } from "@/components/ui/button";
import {
    User as UserIcon,
    Settings,
    Lock,
    Mail,
    UserCircle,
    Shield,
} from "lucide-react";
import { useSharedStore } from "@/storages/shared";

export default function UserLayout() {
    const location = useLocation();
    const pathname = location.pathname;
    const sharedStore = useSharedStore();
    const { user_id } = useParams<{ user_id: string }>();
    const [user, setUser] = useState<User>();

    useEffect(() => {
        if (user_id) {
            getUsers({
                id: Number(user_id), // Convert string ID to number
            }).then((res: any) => {
                // Handle the case where res.data is an array
                if (Array.isArray(res.data) && res.data.length > 0) {
                    setUser(res.data[0]); // Set the first user from the array
                } else if (res.data) {
                    setUser(res.data); // Set the user object directly
                }
            }).catch(error => {
                console.error("Failed to fetch user:", error);
            });
        }
    }, [user_id, sharedStore?.refresh]);

    const options = useMemo(() => {
        return [
            {
                link: `/user/profile/${user_id}`,
                name: "基本信息变更",
                icon: UserIcon,
            },
            {
                link: `/user/profile/${user_id}`,
                name: "基本信息变更",
                icon: UserIcon,
            },
            {
                link: `/user/profile/${user_id}`,
                name: "基本信息变更",
                icon: UserIcon,
            },
            {
                link: `/user/profile/${user_id}`,
                name: "基本信息变更",
                icon: UserIcon,
            },
            {
                link: `/user/profile/${user_id}`,
                name: "基本信息变更",
                icon: UserIcon,
            },
        ];
    }, [user]);

    return (
        <Context.Provider value={{ user }}>
            <div
                className={cn([
                    "flex",
                    "flex-col",
                    "lg:flex-row",
                    "flex-1",
                    "gap-10",
                    "lg:mx-30",
                    "2xl:mx-[17.5vw]",
                ])}
            >
                <div
                    className={cn([
                        "lg:w-1/5",
                        "lg:sticky",
                        "lg:top-25",
                        "space-y-6",
                        "h-fit",
                        "my-10",
                        "mx-10",
                        "lg:mx-0",
                    ])}
                >
                    <div
                        className={cn([
                            "flex",
                            "flex-wrap",
                            "justify-center",
                            "gap-3",
                            "select-none",
                        ])}
                    >
                        <UserIcon />
                        个人设置
                    </div>
                    <Card className={cn(["flex", "flex-col", "p-5", "gap-3"])}>
                        {options?.map((option, index) => {
                            const Comp = option?.disabled ? Button : Link;
                            return (
                                <Button
                                    key={index}
                                    icon={option?.icon}
                                    variant={
                                        pathname === option?.link
                                            ? "tonal"
                                            : "ghost"
                                    }
                                    className={cn(["justify-start"])}
                                    asChild
                                    disabled={option?.disabled}
                                >
                                    <Comp to={option?.link}>
                                        {option?.name}
                                    </Comp>
                                </Button>
                            );
                        })}
                    </Card>
                </div>
                <Card
                    className={cn([
                        "flex-1",
                        "p-10",
                        "border-y-0",
                        "rounded-none",
                        "flex",
                        "flex-col",
                    ])}
                >
                    <Outlet />
                </Card>
            </div>
        </Context.Provider>
    );
}