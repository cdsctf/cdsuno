import { createGame } from "@/api/games";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSharedStore } from "@/storages/shared";
import { cn } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, FlagIcon, PlusCircle, TypeIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface CreateDialogProps {
    onClose: () => void;
}

function CreateDialog(props: CreateDialogProps) {
    const { onClose } = props;
    const sharedStore = useSharedStore();
    const [loading, setLoading] = useState<boolean>(false);
    const formSchema = z.object({
        title: z.string({
            message: "请输入标题",
        }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {},
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);
        createGame({
            ...values,
            description: "",
            is_need_write_up: false,
            is_public: false,
        })
            .then((res) => {
                if (res.code === 200) {
                    toast.success(`比赛 ${res?.data?.title} 创建成功`);
                    onClose();
                }
            })
            .finally(() => {
                sharedStore.setRefresh();
                setLoading(false);
            });
    }
    return (
        <Card
            className={cn([
                "w-128",
                "min-h-64",
                "p-5",
                "flex",
                "flex-col",
                "gap-5",
            ])}
        >
            <h3 className={cn(["flex", "gap-3", "items-center", "text-md"])}>
                <FlagIcon className={cn(["size-4"])} />
                创建比赛
            </h3>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    autoComplete={"off"}
                    className={cn(["flex", "flex-col", "flex-1", "gap-5"])}
                >
                    <FormField
                        control={form.control}
                        name={"title"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>标题</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        icon={TypeIcon}
                                        size={"sm"}
                                        placeholder={"比赛名称"}
                                        value={field.value || ""}
                                        onChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </form>
                <Button
                    variant={"solid"}
                    icon={CheckIcon}
                    level={"success"}
                    loading={loading}
                >
                    确定
                </Button>
            </Form>
        </Card>
    );
}
export { CreateDialog };
