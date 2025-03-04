import { deleteGame, updateGame } from "@/api/games/game_id";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { ContentDialog } from "@/components/widgets/content-dialog";
import { useClipboard } from "@/hooks/use-clipboard";
import { Game } from "@/models/game";
import { useSharedStore } from "@/storages/shared";
import { cn } from "@/utils";
import { ColumnDef } from "@tanstack/react-table";
import {
    ArrowDown,
    ArrowUp,
    ArrowUpDown,
    ClipboardCheck,
    ClipboardCopy,
    EditIcon,
    TrashIcon,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

const columns: ColumnDef<Game>[] = [
    {
        accessorKey: "id",
        id: "id",
        header: "ID", //number
        cell: ({ row }) => {
            const id = row.getValue<number>("id");
            const { isCopied, copyToClipboard } = useClipboard();
            return (
                <div className={cn(["flex", "items-center", "gap-1"])}>
                    <Badge>{id}</Badge>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                icon={isCopied ? ClipboardCheck : ClipboardCopy}
                                square
                                size={"sm"}
                                onClick={() => copyToClipboard(`${id}`)}
                            />
                        </TooltipTrigger>
                        <TooltipContent>复制到剪贴板</TooltipContent>
                    </Tooltip>
                </div>
            );
        },
    },
    {
        accessorKey: "title",
        id: "title",
        header: "标题",
        cell: ({ row }) => {
            const title = row.getValue("title") as string;
            return title || "-";
        },
    },
    {
        accessorKey: "is_public",
        id: "is_public",
        header: "XX",
        cell: ({ row }) => {
            const isPublic = row.getValue<boolean>("is_public");
            const title = row.getValue<string>("title");
            const id = row.getValue<number>("id");
            const [checked, setChecked] = useState(isPublic);

            function handlePublicnessChange() {
                const newValue = !checked;
                setChecked(newValue);

                updateGame({
                    id,
                    is_public: newValue,
                }).then((res) => {
                    if (res.code === 200) {
                        toast.success(
                            `更新题目 ${title} 的XX性: ${newValue ? "XX" : "YY"}`,
                            {
                                id: "publicness_change",
                            }
                        );
                    }
                });
            }

            return (
                <Switch
                    checked={checked}
                    onCheckedChange={handlePublicnessChange}
                    aria-label="公共性开关"
                />
            );
        },
    },

    /* 可见/不可见 */
    {
        accessorKey: "is_enabled",
        id: "is_enabled",
        header: "启用",
        cell: ({ row }) => {
            const isEnabled = row.getValue<boolean>("is_enabled");
            const title = row.getValue<string>("title");
            const id = row.getValue<number>("id");
            const [checked, setChecked] = useState(isEnabled);
            function handlePublicnessChange() {
                const newValue = !checked;
                setChecked(newValue);

                updateGame({
                    id,
                    is_public: newValue,
                }).then((res) => {
                    if (res.code === 200) {
                        toast.success(
                            `更新比赛 ${title} 的公开性: ${newValue ? "公开" : "不公开"}`,
                            {
                                id: "enablement_change",
                            }
                        );
                    }
                });
            }
            return (
                <Switch
                    checked={checked}
                    onCheckedChange={handlePublicnessChange}
                    aria-label="启用性开关"
                />
            );
        },
    },
    {
        accessorKey: "description",
        header: "描述",
        cell: ({ row }) => {
            const description = row.getValue("description") as string;

            if (!description) return "-";

            return description.length > 10 ? (
                <ContentDialog title="详细描述" content={description} />
            ) : (
                description
            );
        },
    },
    {
        accessorKey: "is_need_write_up",
        id: "is_need_write_up",
        header: "题解",
        cell: ({ row }) => {
            const isPublic = row.getValue<boolean>("is_need_write_up");
            const title = row.getValue<string>("title");
            const id = row.getValue<number>("id");
            const [checked, setChecked] = useState(isPublic);

            function handlePublicnessChange() {
                const newValue = !checked;
                setChecked(newValue);

                updateGame({
                    id,
                    is_public: newValue,
                }).then((res) => {
                    if (res.code === 200) {
                        toast.success(
                            `更新题目 ${title} : ${newValue ? "要" : "不要"} 有题解`,
                            {
                                id: "publicness_change",
                            }
                        );
                    }
                });
            }

            return (
                <Switch
                    checked={checked}
                    onCheckedChange={handlePublicnessChange}
                    aria-label="题解开关"
                />
            );
        },
    },

    {
        accessorKey: "updated_at",
        id: "updated_at",
        header: ({ column }) => {
            const Icon = useMemo(() => {
                switch (column.getIsSorted()) {
                    case "asc":
                        return ArrowUp;
                    case "desc":
                        return ArrowDown;
                    case false:
                    default:
                        return ArrowUpDown;
                }
            }, [column.getIsSorted()]);

            return (
                <div className={cn(["flex", "gap-1", "items-center"])}>
                    更新时间
                    <Button
                        icon={Icon}
                        square
                        size={"sm"}
                        onClick={() => column.toggleSorting()}
                    />
                </div>
            );
        },
        cell: ({ row }) => {
            return new Date(
                row.getValue<number>("updated_at") * 1000
            ).toLocaleString();
        },
    },
    {
        accessorKey: "created_at",
        id: "created_at",
        header: ({ column }) => {
            const Icon = useMemo(() => {
                switch (column.getIsSorted()) {
                    case "asc":
                        return ArrowUp;
                    case "desc":
                        return ArrowDown;
                    case false:
                    default:
                        return ArrowUpDown;
                }
            }, [column.getIsSorted()]);

            return (
                <div className={cn(["flex", "gap-1", "items-center"])}>
                    创建时间
                    <Button
                        icon={Icon}
                        square
                        size={"sm"}
                        onClick={() => column.toggleSorting()}
                    />
                </div>
            );
        },
        cell: ({ row }) => {
            return new Date(
                row.getValue<number>("created_at") * 1000
            ).toLocaleString();
        },
    },

    {
        id: "actions",
        header: () => <div className={cn(["justify-self-center"])}>操作</div>,
        cell: ({ row }) => {
            const id = row.getValue<number>("id");
            const title = row.getValue<string>("title");

            const sharedStore = useSharedStore();

            const [deleteDialogOpen, setDeleteDialogOpen] =
                useState<boolean>(false);

            function handleDelete() {
                deleteGame({
                    id,
                })
                    .then((res) => {
                        if (res.code === 200) {
                            toast.success(`比赛 ${title} 删除成功`);
                            setDeleteDialogOpen(false);
                        }
                    })
                    .finally(() => {
                        sharedStore?.setRefresh();
                    });
            }

            return (
                <div
                    className={cn([
                        "flex",
                        "items-center",
                        "justify-center",
                        "gap-2",
                    ])}
                >
                    <Button
                        variant={"ghost"}
                        size={"sm"}
                        square
                        icon={EditIcon}
                        asChild
                    >
                        <Link to={`/admin/games/${id}`} />
                    </Button>
                    <Button
                        level={"error"}
                        variant={"ghost"}
                        size={"sm"}
                        square
                        icon={TrashIcon}
                        onClick={() => setDeleteDialogOpen(true)}
                    />
                    <Dialog
                        open={deleteDialogOpen}
                        onOpenChange={setDeleteDialogOpen}
                    >
                        <DialogContent>
                            <Card
                                className={cn([
                                    "flex",
                                    "flex-col",
                                    "p-5",
                                    "min-h-32",
                                    "w-72",
                                    "gap-5",
                                ])}
                            >
                                <div
                                    className={cn([
                                        "flex",
                                        "gap-2",
                                        "items-center",
                                        "text-sm",
                                    ])}
                                >
                                    <TrashIcon className={cn(["size-4"])} />
                                    删除比赛
                                </div>
                                <p className={cn(["text-sm"])}>
                                    你确定要删除比赛 {title} 吗？
                                </p>
                                <div className={cn(["flex", "justify-end"])}>
                                    <Button
                                        level={"error"}
                                        variant={"tonal"}
                                        size={"sm"}
                                        onClick={handleDelete}
                                    >
                                        确定
                                    </Button>
                                </div>
                            </Card>
                        </DialogContent>
                    </Dialog>
                </div>
            );
        },
    },
];

export { columns };
