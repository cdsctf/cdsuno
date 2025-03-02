import { Challenge } from "@/models/challenge";
import { TableColumnToggle } from "../ui/table-column-toggle";
import { Button } from "@/components/ui/button";
import {
    HashIcon,
    Library,
    ListOrderedIcon,
    PlusCircle,
    TypeIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getChallenges } from "@/api/challenge";
import {
    ColumnFiltersState,
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
import { columns } from "./columns";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { Select } from "@/components/ui/select";
import { useCategoryStore } from "@/storages/category";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CreateDialog } from "./create-dialog";
import { useSharedStore } from "@/storages/shared";

export default function Index() {
    const categoryStore = useCategoryStore();
    const sharedStore = useSharedStore();

    const [createDialogOpen, setCreateDialogOpen] = useState<boolean>(false);

    const [total, setTotal] = useState<number>(0);
    const [challenges, setChallenges] = useState<Array<Challenge>>([]);

    const [page, setPage] = useState<number>(1);
    const [size, setSize] = useState<number>(20);

    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
        {}
    );
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
        {
            id: "category",
            value: "all",
        },
    ]);
    const debouncedColumnFilters = useDebounce(columnFilters, 100);

    const table = useReactTable<Challenge>({
        data: challenges,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        rowCount: total,
        manualFiltering: true,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        manualSorting: true,
        onSortingChange: setSorting,
        state: {
            sorting,
            columnVisibility,
            columnFilters,
        },
    });

    useEffect(() => {
        getChallenges({
            id: debouncedColumnFilters.find((c) => c.id === "id")
                ?.value as string,
            title: debouncedColumnFilters.find((c) => c.id === "title")
                ?.value as string,
            category:
                (debouncedColumnFilters.find((c) => c.id === "category")
                    ?.value as string) !== "all"
                    ? (debouncedColumnFilters.find((c) => c.id === "category")
                          ?.value as number)
                    : undefined,
            sorts: sorting
                .map((value) => (value.desc ? `-${value.id}` : `${value.id}`))
                .join(","),
            page,
            size,
        }).then((res) => {
            setTotal(res?.total || 0);
            setChallenges(res?.data || []);
        });
    }, [page, size, sorting, debouncedColumnFilters, sharedStore.refresh]);

    return (
        <div className={cn(["container", "mx-auto", "py-10"])}>
            <div
                className={cn([
                    "flex",
                    "justify-between",
                    "items-center",
                    "mb-6",
                    "gap-10",
                ])}
            >
                <h1
                    className={cn([
                        "text-2xl",
                        "font-bold",
                        "flex",
                        "gap-2",
                        "items-center",
                    ])}
                >
                    <Library />
                    题库管理
                </h1>
                <div
                    className={cn([
                        "flex",
                        "flex-1",
                        "justify-center",
                        "items-center",
                        "gap-3",
                    ])}
                >
                    <Input
                        size={"sm"}
                        placeholder="ID"
                        icon={HashIcon}
                        value={
                            (table
                                .getColumn("id")
                                ?.getFilterValue() as string) ?? ""
                        }
                        onChange={(e) =>
                            table
                                .getColumn("id")
                                ?.setFilterValue(e.target.value)
                        }
                        className={cn(["flex-1"])}
                    />
                    <Input
                        size={"sm"}
                        placeholder={"题目名"}
                        icon={TypeIcon}
                        value={
                            (table
                                .getColumn("title")
                                ?.getFilterValue() as string) ?? ""
                        }
                        onChange={(e) =>
                            table
                                .getColumn("title")
                                ?.setFilterValue(e.target.value)
                        }
                        className={cn(["flex-1/2"])}
                    />
                    <Select
                        size={"sm"}
                        icon={Library}
                        className={cn(["flex-1"])}
                        options={[
                            {
                                value: "all",
                                content: (
                                    <div
                                        className={cn([
                                            "flex",
                                            "gap-2",
                                            "items-center",
                                        ])}
                                    >
                                        全部
                                    </div>
                                ),
                            },
                            ...categoryStore.categories?.map((category) => {
                                const Icon = category?.icon!;

                                return {
                                    value: String(category?.id),
                                    content: (
                                        <div
                                            className={cn([
                                                "flex",
                                                "gap-2",
                                                "items-center",
                                            ])}
                                        >
                                            <Icon />
                                            {category?.name?.toUpperCase()}
                                        </div>
                                    ),
                                };
                            }),
                        ]}
                        onValueChange={(value) =>
                            table.getColumn("category")?.setFilterValue(value)
                        }
                        value={
                            (table
                                .getColumn("category")
                                ?.getFilterValue() as string) ?? ""
                        }
                    />
                    <Button
                        icon={PlusCircle}
                        variant={"tonal"}
                        onClick={() => setCreateDialogOpen(true)}
                    >
                        添加题目
                    </Button>
                    <Dialog
                        open={createDialogOpen}
                        onOpenChange={setCreateDialogOpen}
                    >
                        <DialogContent>
                            <CreateDialog
                                onClose={() => setCreateDialogOpen(false)}
                            />
                        </DialogContent>
                    </Dialog>
                </div>
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
                                    key={row.getValue("id")}
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
                                    哎呀，好像还没有题目呢。
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <div className="flex items-center justify-between space-x-2 py-4 px-4">
                    <div className="flex-1 text-sm text-muted-foreground">
                        {table.getFilteredRowModel().rows.length} / {total}
                    </div>
                    <div className={cn(["flex", "items-center", "gap-5"])}>
                        <Select
                            size={"sm"}
                            placeholder={"每页显示"}
                            icon={ListOrderedIcon}
                            className={cn(["w-48"])}
                            options={[
                                { value: "20" },
                                { value: "40" },
                                { value: "60" },
                            ]}
                            value={String(size)}
                            onValueChange={(value) => setSize(Number(value))}
                        />
                        <Pagination
                            size={"sm"}
                            value={page}
                            total={Math.ceil(Math.ceil(total / size))}
                            onChange={setPage}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
