import { Challenge } from "@/models/challenge";
import { TableColumnToggle } from "../ui/table-column-toggle";
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
    PlusCircle,
    ShipWheel,
    X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { getChallenges, updateChallenge } from "@/api/challenge";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Pagination } from "@/components/ui/pagination";
import { cn } from "@/utils";
import { useCategoryStore } from "@/storages/category";
import { ContentDialog } from "@/components/widgets/content-dialog";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tooltip } from "@/components/ui/tooltip";
import { useClipboard } from "@/hooks/use-clipboard";
import { Link } from "react-router";
import { toast } from "sonner";

export default function Index() {
    const { getCategory } = useCategoryStore();
    const [total, setTotal] = useState<number>(0);
    const [challenges, setChallenges] = useState<Array<Challenge>>([]);

    const [page, setPage] = useState<number>(1);
    const [size, setSize] = useState<number>(10);

    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
        {}
    );

    const columns: ColumnDef<Challenge>[] = [
        {
            accessorKey: "is_public",
            header: "练习",
            cell: ({ row }) => {
                const isPublic = row.getValue<boolean>("is_public");
                const title = row.getValue<string>("title");
                const id = row.getValue<string>("id");
                const [checked, setChecked] = useState(isPublic);

                function handlePublicnessChange() {
                    const newValue = !checked;
                    setChecked(newValue);

                    updateChallenge({
                        id,
                        is_public: newValue,
                    }).then((res) => {
                        if (res.code === 200) {
                            toast.success(
                                `更新题目 ${title} 的公开性: ${newValue ? "公开" : "私有"}`,
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
                        aria-label="公开性开关"
                    />
                );
            },
        },
        {
            accessorKey: "id",
            id: "id",
            header: "ID",
            cell: ({ row }) => {
                const id = row.getValue<string>("id");
                const { isCopied, copyToClipboard } = useClipboard();
                return (
                    <div className={cn(["flex", "items-center", "gap-1"])}>
                        <Badge>{id?.split("-")?.[0]}</Badge>
                        <Tooltip
                            asChild
                            slotProps={{
                                content: {
                                    children: "复制到剪贴板",
                                },
                            }}
                        >
                            <Button
                                icon={isCopied ? ClipboardCheck : ClipboardCopy}
                                square
                                size={"sm"}
                                onClick={() => copyToClipboard(id)}
                            />
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
            accessorKey: "tags",
            id: "tags",
            header: "标签",
            cell: ({ row }) => {
                const tags = row.getValue("tags") as string[] | undefined;

                if (!tags || !Array.isArray(tags) || tags.length === 0) {
                    return "-";
                }

                return (
                    <div className="flex flex-wrap gap-1">
                        {tags.slice(0, 3).map((tag, index) => (
                            <Badge key={index}>{tag}</Badge>
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
                const category = getCategory(categoryId);

                const Icon = category.icon!;
                return (
                    <div className={cn(["flex", "gap-2", "items-center"])}>
                        <Icon className={cn(["size-4"])} />
                        {getCategory(categoryId)?.name}
                    </div>
                );
            },
        },
        {
            accessorKey: "has_attachment",
            header: "附件",
            cell: ({ row }) => {
                const hasAttachment = row.getValue<boolean>("has_attachment");

                const options = [
                    {
                        className: ["bg-warning", "text-warning-foreground"],
                        icon: <X />,
                    },
                    {
                        className: ["bg-info", "text-info-foreground"],
                        icon: <Check />,
                    },
                ];

                return (
                    <Badge
                        className={cn([
                            options[Number(hasAttachment)]?.className,
                        ])}
                    >
                        {options[Number(hasAttachment)]?.icon}
                    </Badge>
                );
            },
        },
        {
            accessorKey: "is_dynamic",
            header: "动态性",
            cell: ({ row }) => {
                const isDynamic = row.getValue<boolean>("is_dynamic");

                return (
                    <Badge
                        className={cn([
                            isDynamic
                                ? ["bg-info", "text-info-foreground"]
                                : ["bg-success", "text-success-foreground"],
                        ])}
                    >
                        {isDynamic ? <ShipWheel /> : <Box />}
                        {isDynamic ? "动态" : "静态"}
                    </Badge>
                );
            },
        },
        {
            accessorKey: "updated_at",
            id: "updated_at",
            header: ({}) => {
                return (
                    <div className={cn(["flex", "gap-1", "items-center"])}>
                        更新时间
                        <Button
                            icon={ArrowUpDown}
                            square
                            size={"sm"}
                            // onClick={() => toggleSort("updated_at")}
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
            header: "操作",
            cell: ({ row }) => {
                const id = row.getValue<string>("id");
                const title = row.getValue<string>("title");

                const handleDelete = () => {
                    console.log(`删除题目: ${id}`);
                    // 实际应用中应该调用API进行删除
                    // 例如: deleteChallenge(id).then(() => refreshData());
                };

                return (
                    <div
                        className={cn([
                            "flex",
                            "items-center",
                            "justify-center",
                            "space-x-2",
                        ])}
                    >
                        <Button
                            variant={"ghost"}
                            size={"sm"}
                            square
                            icon={EditIcon}
                            asChild
                        >
                            <Link to={`/admin/challenges/${id}`} />
                        </Button>
                        {/* 删除确认对话框
                        <DeleteConfirmDialog
                            id={id}
                            title={title}
                            onConfirm={handleDelete}
                        /> */}
                    </div>
                );
            },
        },
    ];

    const table = useReactTable<Challenge>({
        data: challenges,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        rowCount: total,
        manualFiltering: true,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            sorting,
            columnVisibility,
        },
        manualSorting: true,
        onSortingChange: setSorting,
    });

    useEffect(() => {
        getChallenges({
            sorts: sorting
                .map((value) => (value.desc ? `-${value.id}` : `${value.id}`))
                .join(","),
            page,
            size,
        }).then((res) => {
            setTotal(res?.total || 0);
            setChallenges(res?.data || []);
        });
    }, [page, size, sorting]);

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">题库管理</h1>
                <Button icon={PlusCircle} variant={"tonal"}>
                    添加题目
                </Button>
            </div>

            <div className="flex justify-end mb-4">
                <TableColumnToggle title="显示/隐藏列" />
            </div>

            <div className={cn(["rounded-md", "border", "bg-card"])}>
                <Table className={cn(["text-foreground"])}>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {!header.isPlaceholder &&
                                                flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <div className="flex items-center justify-end space-x-2 py-4 px-4">
                    <div className="flex-1 text-sm text-muted-foreground">
                        {table.getFilteredRowModel().rows.length} / {total}
                    </div>
                    <Pagination
                        size={"sm"}
                        value={page}
                        total={Math.ceil(Math.ceil(total / size))}
                        onChange={setPage}
                    />
                </div>
            </div>
        </div>
    );
}
