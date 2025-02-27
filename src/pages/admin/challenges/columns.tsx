import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Challenge } from "@/models/challenge";
import { Badge } from "@/components/ui/badge";
import { ContentDialog } from "../ui/content-dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
    EditIcon,
    EyeIcon,
    FileIcon,
    FileTextIcon,
    Trash2Icon,
} from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { Env } from "@/models/env";
import { Card } from "@/components/ui/card";
import { cn } from "@/utils";

const categoryMap: { [key: number]: string } = {
    0: "Web",
    1: "Pwn",
    2: "Reverse",
    3: "Crypto",
    4: "Misc",
    // ...
};

function formatTimestamp(timestamp: number | undefined) {
    if (!timestamp) return "-";

    const date = new Date(timestamp * 1000);

    const beijingDate = new Date(date.getTime() + 8 * 60 * 60 * 1000);

    const year = beijingDate.getUTCFullYear();
    const month = String(beijingDate.getUTCMonth() + 1).padStart(2, "0");
    const day = String(beijingDate.getUTCDate()).padStart(2, "0");
    const hours = String(beijingDate.getUTCHours()).padStart(2, "0");
    const minutes = String(beijingDate.getUTCMinutes()).padStart(2, "0");
    const seconds = String(beijingDate.getUTCSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} UTC+8`;
}

function DeleteConfirmDialog({
    id,
    title,
    onConfirm,
}: {
    id: string;
    title: string;
    onConfirm: () => void;
}) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
            slotProps={{
                contentProps: {
                    children: (
                        <Card className={cn(["sm:max-w-md"])}>
                            您确定要删除题目{" "}
                            <span className="font-medium">"{title}"</span> 吗？
                            <div className="py-4">
                                <p className="text-sm text-muted-foreground">
                                    此操作不可恢复，删除后该题目的所有数据将被永久移除。
                                </p>
                            </div>
                            <Button
                                variant="outline"
                                onClick={() => setOpen(false)}
                            >
                                取消
                            </Button>
                            <Button
                                level={"error"}
                                onClick={() => {
                                    onConfirm();
                                    setOpen(false);
                                }}
                            >
                                确认删除
                            </Button>
                        </Card>
                    ),
                },
            }}
        >
            <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                title="删除"
            >
                <Trash2Icon className="h-4 w-4" />
                <span className="sr-only">删除</span>
            </Button>
        </Dialog>
    );
}

export const columns: ColumnDef<Challenge>[] = [
    {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => {
            const id = row.getValue("id") as string;
            return id || "-";
        },
    },
    {
        accessorKey: "title",
        header: "标题",
        cell: ({ row }) => {
            const title = row.getValue("title") as string;
            return title || "-";
        },
    },
    {
        accessorKey: "tags",
        header: "标签",
        cell: ({ row }) => {
            const tags = row.getValue("tags") as string[] | undefined;

            if (!tags || !Array.isArray(tags) || tags.length === 0) {
                return "-";
            }

            return (
                <div className="flex flex-wrap gap-1">
                    {tags.slice(0, 3).map((tag, index) => (
                        <Badge
                            key={index}
                            variant="outline"
                            className="px-2 py-0.5"
                        >
                            {tag}
                        </Badge>
                    ))}
                    {tags.length > 3 && (
                        <ContentDialog
                            title="所有标签"
                            content={tags.join(", ")}
                            triggerText={`+${tags.length - 3}`}
                        />
                    )}
                </div>
            );
        },
    },
    {
        accessorKey: "description",
        header: "描述",
        cell: ({ row }) => {
            const description = row.getValue("description") as string;

            if (!description) return "-";

            // 如果描述太长，使用对话框
            return description.length > 10 ? (
                <ContentDialog title="详细描述" content={description} />
            ) : (
                description
            );
        },
    },
    {
        accessorKey: "category",
        header: "分类",
        cell: ({ row }) => {
            const categoryId = row.getValue("category") as number;
            return categoryMap[categoryId] || `分类 ${categoryId}` || "-";
        },
    },
    {
        accessorKey: "has_attachment",
        header: "附件",
        cell: ({ row }) => {
            const hasAttachment = row.getValue("has_attachment") as boolean;
            const [checked, setChecked] = useState(hasAttachment);
            const id = row.getValue("id") as string;

            const handleChange = async () => {
                try {
                    // 切换状态
                    const newValue = !checked;
                    setChecked(newValue);

                    // 在这里更新服务器数据
                    console.log(`更新题目 ${id} 的附件状态: ${newValue}`);
                    // 实际应用中调用API:
                    // await updateChallenge(id, { has_attachment: newValue })
                } catch (error) {
                    // 如果更新失败，恢复原始状态
                    setChecked(hasAttachment);
                    console.error("更新失败", error);
                }
            };

            return (
                <div className="flex items-center justify-center space-x-2">
                    <Switch
                        checked={checked}
                        onCheckedChange={handleChange}
                        aria-label="附件开关"
                    />

                    {checked && (
                        <Dialog
                            slotProps={{
                                contentProps: {
                                    children: (
                                        <div className="py-4">
                                            <div className="space-y-4">
                                                <div className="border rounded-md p-4">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center space-x-2">
                                                            <FileIcon className="h-5 w-5 text-muted-foreground" />
                                                            <span>
                                                                challenge.zip
                                                            </span>
                                                        </div>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                        >
                                                            下载
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div className="border rounded-md p-4">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center space-x-2">
                                                            <FileTextIcon className="h-5 w-5 text-muted-foreground" />
                                                            <span>
                                                                readme.txt
                                                            </span>
                                                        </div>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                        >
                                                            下载
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ),
                                },
                            }}
                        >
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                            >
                                <EyeIcon className="h-4 w-4" />
                                <span className="sr-only">查看附件</span>
                            </Button>
                        </Dialog>
                    )}
                </div>
            );
        },
    },
    {
        accessorKey: "is_public",
        header: "公开性",
        cell: ({ row }) => {
            const isPublic = row.getValue("is_public") as boolean;
            const [checked, setChecked] = useState(isPublic);

            const handleChange = async () => {
                try {
                    // 切换状态
                    const newValue = !checked;
                    setChecked(newValue);

                    // 在这里更新服务器数据
                    console.log(
                        `更新题目 ${row.getValue("id")} 的公开性: ${newValue ? "公开" : "私有"}`
                    );
                    // 实际应用中调用API:
                    // await updateChallenge(row.getValue("id"), { is_public: newValue })
                } catch (error) {
                    // 如果更新失败，恢复原始状态
                    setChecked(isPublic);
                    console.error("更新失败", error);
                }
            };

            return (
                <div className="flex items-center justify-center space-x-2">
                    <Switch
                        checked={checked}
                        onCheckedChange={handleChange}
                        aria-label="公开性开关"
                    />
                    <span className="text-xs text-muted-foreground">
                        {checked ? "公开" : "私有"}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: "is_dynamic",
        header: "动态性",
        cell: ({ row }) => {
            const isDynamic = row.getValue("is_dynamic") as boolean;
            const [checked, setChecked] = useState(isDynamic);

            const handleChange = async () => {
                try {
                    // 切换状态
                    const newValue = !checked;
                    setChecked(newValue);

                    // 在这里更新服务器数据
                    console.log(
                        `更新题目 ${row.getValue("id")} 的动态性: ${newValue ? "动态" : "静态"}`
                    );
                    // 实际应用中调用API:
                    // await updateChallenge(row.getValue("id"), { is_dynamic: newValue })
                } catch (error) {
                    // 如果更新失败，恢复原始状态
                    setChecked(isDynamic);
                    console.error("更新失败", error);
                }
            };

            return (
                <div className="flex items-center justify-center space-x-2">
                    <Switch
                        checked={checked}
                        onCheckedChange={handleChange}
                        aria-label="动态性开关"
                    />
                    <span className="text-xs text-muted-foreground">
                        {checked ? "动态" : "静态"}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: "env",
        header: "环境",
        cell: ({ row }) => {
            const env = row.getValue("env") as Env | undefined;
            if (!env) return "-";

            return (
                <ContentDialog
                    title="环境配置"
                    content={String(env)}
                    showPreview={false}
                />
            );
        },
    },
    {
        accessorKey: "checker",
        header: "Flag Checker",
        cell: ({ row }) => {
            const checker = row.getValue("checker") as string;
            if (!checker) return "-";

            return (
                <ContentDialog
                    title="Flag Checker"
                    content={checker}
                    showPreview={false}
                />
            );
        },
    },
    {
        accessorKey: "updated_at",
        header: "更新时间",
        cell: ({ row }) => {
            return formatTimestamp(row.getValue("updated_at") as number);
        },
    },
    {
        accessorKey: "created_at",
        header: "创建时间",
        cell: ({ row }) => {
            return formatTimestamp(row.getValue("created_at") as number);
        },
    },
    {
        id: "actions",
        header: "操作",
        cell: ({ row }) => {
            const id = row.getValue("id") as string;
            const title = row.getValue("title") as string;

            const handleDelete = () => {
                console.log(`删除题目: ${id}`);
                // 实际应用中应该调用API进行删除
                // 例如: deleteChallenge(id).then(() => refreshData());
            };

            return (
                <div className="flex items-center justify-center space-x-2">
                    {/* 编辑按钮 */}
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => {
                            window.location.href = `/admin/challenges/edit/${id}`;
                        }}
                        title="编辑"
                    >
                        <EditIcon className="h-4 w-4" />
                        <span className="sr-only">编辑</span>
                    </Button>

                    {/* 删除确认对话框 */}
                    <DeleteConfirmDialog
                        id={id}
                        title={title}
                        onConfirm={handleDelete}
                    />
                </div>
            );
        },
    },
];
