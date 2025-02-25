import { Button } from "@/components/ui/button";
import {
    House,
    Library,
    Flag,
    LogOut,
    UsersRound,
    UserRound,
    Star,
    ChartNoAxesCombined,
} from "lucide-react";
import { useContext, useMemo } from "react";
import { Link, useLocation } from "react-router";
import { useGameStore } from "@/storages/game";
import { Context } from "./context";

function TabSection() {
    const location = useLocation();
    const pathname = location.pathname;
    const { mode } = useContext(Context);
    const { currentGame, selfGameTeam } = useGameStore();

    const options = useMemo(() => {
        switch (mode) {
            case "game":
                return [
                    {
                        link: `/games/${currentGame?.id}`,
                        name: "主页",
                        icon: House,
                    },
                    {
                        link: `/games/${currentGame?.id}/challenges`,
                        name: "题目",
                        icon: Star,
                        disabled: !selfGameTeam?.is_allowed,
                    },
                    {
                        link: `/games/${currentGame?.id}/scoreboard`,
                        name: "积分榜",
                        icon: ChartNoAxesCombined,
                    },
                    {
                        link: `/games`,
                        name: "退出",
                        icon: LogOut,
                        warning: true,
                    },
                ];
            case "admin":
                return [
                    {
                        link: "/admin",
                        name: "主页",
                        icon: House,
                    },
                    {
                        link: "/admin/challenges",
                        name: "题库",
                        icon: Library,
                    },
                    {
                        link: "/admin/games",
                        name: "比赛",
                        icon: Flag,
                    },
                    {
                        link: "/admin/teams",
                        name: "团队",
                        icon: UsersRound,
                    },
                    {
                        link: "/admin/users",
                        name: "用户",
                        icon: UserRound,
                    },
                    {
                        link: "/",
                        name: "退出",
                        icon: LogOut,
                        warning: true,
                    },
                ];
            case "default":
            default:
                return [
                    {
                        link: "/",
                        name: "主页",
                        icon: House,
                    },
                    {
                        link: "/playground",
                        name: "练习场",
                        icon: Library,
                    },
                    {
                        link: "/games",
                        name: "比赛",
                        icon: Flag,
                    },
                ];
        }
    }, [mode, currentGame?.id, selfGameTeam?.is_allowed]);

    return (
        <>
            {options?.map((option, index) => {
                const Comp = option?.disabled ? Button : Link;

                return (
                    <Button
                        key={index}
                        asChild
                        variant={pathname === option?.link ? "tonal" : "ghost"}
                        size={"sm"}
                        className={"font-semibold"}
                        disabled={option?.disabled}
                        icon={option.icon}
                        level={option?.warning ? "warning" : "primary"}
                    >
                        <Comp to={option.link}>{option?.name}</Comp>
                    </Button>
                );
            })}
        </>
    );
}

export { TabSection };
