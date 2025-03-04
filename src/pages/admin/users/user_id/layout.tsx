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
    LockIcon,
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
                id: Number(user_id), 
            }).then((res: any) => {
                if (Array.isArray(res.data) && res.data.length > 0) {
                    setUser(res.data[0]);
                } else if (res.data) {
                    setUser(res.data);
                }
            }).catch(error => {
                console.error("Failed to fetch user:", error);
            });
        }
    }, [user_id, sharedStore?.refresh]);

    const options = useMemo(() => {
        return [
            {
                link: `/admin/users/${user_id}/profile`,
                name: "基本信息变更",
                icon: UserIcon,
            },
            {
                link: `/admin/users/${user_id}/password`,
                name: "修改密码",
                icon: LockIcon,
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
                        用户设置
                    </div>
                    <Card className={cn(["flex", "flex-col", "p-5", "gap-3"])}>
                        {options?.map((option, index) => {
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
                                >
                                    <Link to={option?.link}>
                                        {option?.name}
                                    </Link>
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