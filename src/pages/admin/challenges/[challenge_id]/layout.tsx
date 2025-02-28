import { Link, Outlet, useLocation, useParams } from "react-router";
import { Context } from "./context";
import { useEffect, useMemo, useState } from "react";
import { Challenge } from "@/models/challenge";
import { getChallenges } from "@/api/challenge";
import { Card } from "@/components/ui/card";
import { cn } from "@/utils";
import { Button } from "@/components/ui/button";
import {
    ArrowLeft,
    ChartArea,
    Container,
    Folder,
    Info,
    ScrollText,
} from "lucide-react";
import { useSharedStore } from "@/storages/shared";

export default function Layout() {
    const location = useLocation();
    const pathname = location.pathname;
    const sharedStore = useSharedStore();
    const { challenge_id } = useParams<{ challenge_id: string }>();
    const [challenge, setChallenge] = useState<Challenge>();

    useEffect(() => {
        getChallenges({
            id: challenge_id,
        }).then((res) => {
            setChallenge(res.data?.[0]);
        });
    }, [sharedStore?.refresh]);

    const options = useMemo(() => {
        return [
            {
                link: `/admin/challenges/${challenge_id}`,
                name: "基本信息",
                icon: Info,
            },
            {
                link: `/admin/challenges/${challenge_id}/checker`,
                name: "检查器",
                icon: ScrollText,
            },
            {
                link: `/admin/challenges/${challenge_id}/attachments`,
                name: "附件",
                icon: Folder,
                disabled: !challenge?.has_attachment,
            },
            {
                link: `/admin/challenges/${challenge_id}/env`,
                name: "动态环境",
                icon: Container,
                disabled: !challenge?.is_dynamic,
            },
            {
                link: `/admin/challenges/${challenge_id}/statistics`,
                name: "统计数据",
                icon: ChartArea,
                disabled: true,
            },
        ];
    }, [challenge]);

    return (
        <Context.Provider value={{ challenge }}>
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
                        "lg:w-1/4",
                        "lg:sticky",
                        "lg:top-25",
                        "space-y-5",
                        "h-fit",
                        "my-10",
                        "mx-10",
                        "lg:mx-0",
                    ])}
                >
                    <Card className={cn(["p-3", "flex", "justify-center"])}>
                        <Button
                            level={"warning"}
                            icon={ArrowLeft}
                            asChild
                            className={cn(["flex-1"])}
                        >
                            <Link to={"/admin/challenges"}>返回上级</Link>
                        </Button>
                    </Card>
                    <Card className={cn(["flex", "flex-col", "p-5", "gap-5"])}>
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
