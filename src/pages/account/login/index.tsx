import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useConfigStore } from "@/storages/config";
import { cn } from "@/utils";

export default function Index() {
    const configStore = useConfigStore();

    return (
        <div
            className={cn(["flex-1", "flex", "items-center", "justify-center"])}
        >
            <Card
                className={cn([
                    "h-[25rem]",
                    "w-[40rem]",
                    "flex",
                    "justify-between",
                ])}
            >
                <div>
                    <CardHeader>
                        <CardTitle>登录</CardTitle>
                        <CardDescription>
                            登录以继续浏览 {configStore?.config?.meta?.title}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Card Content</p>
                    </CardContent>
                    <CardFooter>
                        <p>Card Footer</p>
                    </CardFooter>
                </div>
                <Separator
                    orientation={"vertical"}
                    className={cn(["h-4/5", "mt-auto", "mb-auto"])}
                />
                1
            </Card>
        </div>
    );
}
