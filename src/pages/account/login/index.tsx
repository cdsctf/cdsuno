import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LogIn, UserRoundPlus } from "lucide-react";
import { useConfigStore } from "@/storages/config";
import { cn } from "@/utils";
import { Button } from "@/components/ui/button";
import { LoginForm } from "./login-form";

export default function Index() {
    const configStore = useConfigStore();

    return (
        <div
            className={cn(["flex-1", "flex", "items-center", "justify-center"])}
        >
            <Card
                className={cn(["p-2", "w-[50rem]", "flex", "justify-between"])}
            >
                <div className={cn(["flex-1/2", "flex", "flex-col"])}>
                    <CardHeader>
                        <CardTitle
                            className={cn(["flex", "gap-2", "items-center"])}
                        >
                            <LogIn />
                            登录
                        </CardTitle>
                        <CardDescription>
                            登录以继续浏览 {configStore?.config?.meta?.title}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className={cn(["flex-1"])}>
                        <LoginForm />
                    </CardContent>
                </div>
                <Separator
                    orientation={"vertical"}
                    className={cn(["h-81", "my-auto"])}
                />
                <div className={cn(["flex-1/2", "flex", "flex-col", "p-6"])}>
                    <div
                        className={cn([
                            "flex",
                            "flex-col",
                            "flex-1",
                            "items-center",
                            "justify-center",
                            "select-none",
                        ])}
                    >
                        <img
                            alt="logo"
                            decoding={"async"}
                            src={"/api/configs/icon"}
                            draggable={false}
                            className={cn([
                                "drop-shadow-md",
                                "aspect-square",
                                "h-[10rem]",
                            ])}
                        />
                        <span className={cn(["text-2xl", "font-semibold"])}>
                            {configStore?.config?.meta?.title}
                        </span>
                    </div>
                    <Button
                        className={cn("w-full")}
                        size={"lg"}
                        variant={"tonal"}
                        icon={UserRoundPlus}
                    >
                        还没有账号？注册！
                    </Button>
                </div>
            </Card>
        </div>
    );
}
