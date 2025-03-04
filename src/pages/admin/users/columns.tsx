import { Group,User } from "@/models/user";
import { Button } from "@/components/ui/button";
import {
    ArrowDown,
    ArrowUp,
    ArrowUpDown,
    Box,
    Check,
    ClipboardCheck,
    ClipboardCopy,
    EditIcon,
    ShipWheel,
    TrashIcon,
    X,
} from "lucide-react";
import { UserIcon, ShieldIcon, UserXIcon, UserCheckIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { deleteChallenge, updateChallenge } from "@/api/challenge";
import { deleteUser, updateUser } from "@/api/user";
import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/utils";
import { useCategoryStore } from "@/storages/category";
import { ContentDialog } from "@/components/widgets/content-dialog";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useClipboard } from "@/hooks/use-clipboard";
import { Link } from "react-router";
import { toast } from "sonner";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { useSharedStore } from "@/storages/shared";

// export interface User {
//     id?: number;
//     username?: string;
//     nickname?: string;
//     email?: string;
//     group?: Group;
//     description?: string;
//     teams?: Array<Team>;
//     created_at?: string;

const columns: ColumnDef<User>[] = [
    // {
    //     accessorKey: "is_public",
    //     header: "练习",
    //     cell: ({ row }) => {
    //         const isPublic = row.getValue<boolean>("is_public");
    //         const title = row.getValue<string>("title");
    //         const id = row.getValue<string>("id");
    //         const [checked, setChecked] = useState(isPublic);

    //         function handlePublicnessChange() {
    //             const newValue = !checked;
    //             setChecked(newValue);

    //             updateChallenge({
    //                 id,
    //                 is_public: newValue,
    //             }).then((res) => {
    //                 if (res.code === 200) {
    //                     toast.success(
    //                         `更新题目 ${title} 的公开性: ${newValue ? "公开" : "私有"}`,
    //                         {
    //                             id: "publicness_change",
    //                         }
    //                     );
    //                 }
    //             });
    //         }

    //         return (
    //             <Switch
    //                 checked={checked}
    //                 onCheckedChange={handlePublicnessChange}
    //                 aria-label="公开性开关"
    //             />
    //         );
    //     },
    // },
    {
        accessorKey: "id",
        id: "id",
        header: "UID",
        cell: ({ row }) => {
            const id = row.getValue("id");
            const idString = String(id); // Convert to string regardless of type
            const { isCopied, copyToClipboard } = useClipboard();
            
            // Check if the ID contains a hyphen before trying to split
            const displayId = idString.includes("-") ? idString.split("-")[0] : idString;
            
            return (
                <div className={cn(["flex", "items-center", "gap-1"])}>
                    <Badge>{displayId}</Badge>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                icon={isCopied ? ClipboardCheck : ClipboardCopy}
                                square
                                size={"sm"}
                                onClick={() => copyToClipboard(idString)}
                            />
                        </TooltipTrigger>
                        <TooltipContent>复制到剪贴板</TooltipContent>
                    </Tooltip>
                </div>
            );
        },
    },
    {
        accessorKey: "username",
        id: "username",
        header: "用户名",
        cell: ({ row }) => {
            const username = row.getValue("username") as string;
            return username || "-";
        },
    },
    {
        accessorKey: "nickname",
        id: "nickname",
        header: "昵称",
        cell: ({ row }) => {
            const nickname = row.getValue("nickname") as string;
            return nickname || "-";
        },
    },
    {
        accessorKey: "email",
        id: "email",
        header: "邮箱",
        cell: ({ row }) => {
            const email = row.getValue("email") as string;
            return email || "-";
        },
    },
    // {
    //     accessorKey: "groups",
    //     id: "groups",
    //     header: "用户组",
    //     cell: ({ row }) => {
    //         const tags = row.getValue("tags") as string[] | undefined;

    //         if (!tags || !Array.isArray(tags) || tags.length === 0) {
    //             return "-";
    //         }

    //         return (
    //             <div className="flex flex-wrap gap-1">
    //                 {tags.slice(0, 3).map((tag, index) => (
    //                     <Badge key={index}>{tag}</Badge>
    //                 ))}
    //                 {tags.length > 3 && (
    //                     <ContentDialog
    //                         title="所有标签"
    //                         content={tags.join(", ")}
    //                         triggerText={`+${tags.length - 3}`}
    //                     />
    //                 )}
    //             </div>
    //         );
    //     },
    // },
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
        accessorKey: "group",
        header: "用户组",
        cell: ({ row }) => {
            const groupId = row.getValue("group") as number;
            
            const groupConfig = {
                [Group.Guest]: { name: "GUEST", icon: UserIcon, className: "bg-secondary text-secondary-foreground" },
                [Group.Banned]: { name: "BANNED", icon: UserXIcon, className: "bg-destructive text-destructive-foreground" },
                [Group.User]: { name: "USER", icon: UserCheckIcon, className: "bg-primary text-primary-foreground" },
                [Group.Admin]: { name: "ADMIN", icon: ShieldIcon, className: "bg-info text-info-foreground" },
            };
            
            const config = groupConfig[groupId as Group] || groupConfig[Group.Guest];
            const Icon = config.icon;
            
            return (
                <div className={cn(["flex", "gap-2", "items-center"])}>
                    <Badge className={config.className}>
                        <div className="flex items-center gap-1">
                            <Icon className="size-3.5" />
                            <span>{config.name}</span>
                        </div>
                    </Badge>
                </div>
            );
        },
    },
    // {
    //     accessorKey: "has_attachment",
    //     header: "附件",
    //     cell: ({ row }) => {
    //         const hasAttachment = row.getValue<boolean>("has_attachment");

    //         const options = [
    //             {
    //                 className: ["bg-warning", "text-warning-foreground"],
    //                 icon: <X />,
    //             },
    //             {
    //                 className: ["bg-info", "text-info-foreground"],
    //                 icon: <Check />,
    //             },
    //         ];

    //         return (
    //             <Badge
    //                 className={cn([options[Number(hasAttachment)]?.className])}
    //             >
    //                 {options[Number(hasAttachment)]?.icon}
    //             </Badge>
    //         );
    //     },
    // },
    // {
    //     accessorKey: "is_dynamic",
    //     header: "动态性",
    //     cell: ({ row }) => {
    //         const isDynamic = row.getValue<boolean>("is_dynamic");

    //         return (
    //             <Badge
    //                 className={cn([
    //                     isDynamic
    //                         ? ["bg-info", "text-info-foreground"]
    //                         : ["bg-success", "text-success-foreground"],
    //                 ])}
    //             >
    //                 {isDynamic ? <ShipWheel /> : <Box />}
    //                 {isDynamic ? "动态" : "静态"}
    //             </Badge>
    //         );
    //     },
    // },
    // {
    //     accessorKey: "updated_at",
    //     id: "updated_at",
    //     header: ({ column }) => {
    //         const Icon = useMemo(() => {
    //             switch (column.getIsSorted()) {
    //                 case "asc":
    //                     return ArrowUp;
    //                 case "desc":
    //                     return ArrowDown;
    //                 case false:
    //                 default:
    //                     return ArrowUpDown;
    //             }
    //         }, [column.getIsSorted()]);

    //         return (
    //             <div className={cn(["flex", "gap-1", "items-center"])}>
    //                 更新时间
    //                 <Button
    //                     icon={Icon}
    //                     square
    //                     size={"sm"}
    //                     onClick={() => column.toggleSorting()}
    //                 />
    //             </div>
    //         );
    //     },
    //     cell: ({ row }) => {
    //         return new Date(
    //             row.getValue<number>("updated_at") * 1000
    //         ).toLocaleString();
    //     },
    // },
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
                    注册时间
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
            const username = row.getValue<string>("username");

            const sharedStore = useSharedStore();

            const [deleteDialogOpen, setDeleteDialogOpen] =
                useState<boolean>(false);

            function handleDelete() {
                deleteUser({
                    id,
                })
                    .then((res) => {
                        if (res.code === 200) {
                            toast.success(`用户 ${username} 删除成功`);
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
                        <Link to={`/admin/users/${id}`} />
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
                                    删除用户
                                </div>
                                <p className={cn(["text-sm"])}>
                                    你确定要删除用户 {username} 吗？
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
