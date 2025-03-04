import { User } from "@/models/user";
import { Button } from "@/components/ui/button";
import {
    HashIcon,
    Library,
    ListOrderedIcon,
    PlusCircle,
    TypeIcon,
    UserIcon,
    ShieldIcon,
    UserXIcon,
    UserCheckIcon,
    MailIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
// import { getUsers } from "@/api/user"; // 暂时注释掉 API 导入
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
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CreateUserDialog } from "./create-dialog";
import { useSharedStore } from "@/storages/shared";

// Define the Group enum
export enum Group {
    Guest = 0,
    Banned = 1,
    User = 2,
    Admin = 3,
}

// 添加测试数据
const mockUsers: User[] = [
    {
        id: 1,
        username: "admin",
        nickname: "系统管理员",
        email: "admin@example.com",
        group: Group.Admin,
        created_at: "2025-01-01T00:00:00Z",
        updated_at: "2025-01-01T00:00:00Z"
    },
    {
        id: 2,
        username: "user1",
        nickname: "普通用户",
        email: "user1@example.com",
        group: Group.User,
        created_at: "2025-01-02T10:30:00Z",
        updated_at: "2025-01-02T10:30:00Z"
    },
    {
        id: 3,
        username: "guest123",
        nickname: "访客用户",
        email: "guest@example.com",
        group: Group.Guest,
        created_at: "2025-01-03T14:15:00Z",
        updated_at: "2025-01-03T14:15:00Z"
    },
    {
        id: 4,
        username: "banneduser",
        nickname: "已禁用账号",
        email: "banned@example.com",
        group: Group.Banned,
        created_at: "2025-01-04T09:45:00Z",
        updated_at: "2025-02-01T16:20:00Z"
    },
    {
        id: 5,
        username: "moderator",
        nickname: "版主小李",
        email: "mod@example.com",
        group: Group.Admin,
        created_at: "2025-01-05T11:22:00Z",
        updated_at: "2025-01-05T11:22:00Z"
    },
    {
        id: 6,
        username: "newuser",
        nickname: "新注册用户",
        email: "new@example.com",
        group: Group.User,
        created_at: "2025-02-10T08:30:00Z",
        updated_at: "2025-02-10T08:30:00Z"
    },
    {
        id: 7,
        username: "tester",
        nickname: "测试账号",
        email: "test@example.com",
        group: Group.User,
        created_at: "2025-02-15T13:40:00Z",
        updated_at: "2025-02-15T13:40:00Z"
    },
    {
        id: 8,
        username: "inactive",
        nickname: "不活跃用户",
        email: "inactive@example.com",
        group: Group.Banned,
        created_at: "2025-01-20T10:10:00Z",
        updated_at: "2025-02-20T17:30:00Z"
    },
    {
        id: 9,
        username: "developer",
        nickname: "开发人员",
        email: "dev@example.com",
        group: Group.Admin,
        created_at: "2025-01-10T09:00:00Z",
        updated_at: "2025-01-10T09:00:00Z"
    },
    {
        id: 10,
        username: "contributor",
        nickname: "社区贡献者",
        email: "contribute@example.com",
        group: Group.User,
        created_at: "2025-01-25T16:20:00Z",
        updated_at: "2025-01-25T16:20:00Z"
    }
];

// 模拟 API 获取用户数据的函数
const mockGetUsers = (params: any) => {
    let filteredUsers = [...mockUsers];
    
    // 过滤 ID
    if (params.id) {
        filteredUsers = filteredUsers.filter(user => 
            user.id.toString().includes(params.id.toString())
        );
    }
    
    // 过滤用户名
    if (params.username) {
        filteredUsers = filteredUsers.filter(user => 
            user.username.toLowerCase().includes(params.username.toLowerCase())
        );
    }
    
    // 过滤昵称
    if (params.name) {
        filteredUsers = filteredUsers.filter(user => 
            user.nickname.toLowerCase().includes(params.name.toLowerCase())
        );
    }
    
    // 过滤邮箱
    if (params.email) {
        filteredUsers = filteredUsers.filter(user => 
            user.email.toLowerCase().includes(params.email.toLowerCase())
        );
    }
    
    // 过滤用户组
    if (params.group !== undefined) {
        filteredUsers = filteredUsers.filter(user => 
            user.group === params.group
        );
    }
    
    // 排序
    if (params.sorts) {
        const sortParams = params.sorts.split(',');
        sortParams.forEach((sort: string) => {
            const isDesc = sort.startsWith('-');
            const field = isDesc ? sort.substring(1) : sort;
            
            filteredUsers.sort((a, b) => {
                let compareA = a[field as keyof User];
                let compareB = b[field as keyof User];
                
                if (typeof compareA === 'string') {
                    compareA = compareA.toLowerCase();
                    compareB = (compareB as string).toLowerCase();
                }
                
                if (compareA < compareB) return isDesc ? 1 : -1;
                if (compareA > compareB) return isDesc ? -1 : 1;
                return 0;
            });
        });
    }
    
    // 分页
    const total = filteredUsers.length;
    const start = (params.page - 1) * params.size;
    const end = start + params.size;
    const paginatedUsers = filteredUsers.slice(start, end);
    
    // 模拟异步操作
    return Promise.resolve({
        total: total,
        data: paginatedUsers
    });
};

export default function Index() {
    const sharedStore = useSharedStore();

    const [createDialogOpen, setCreateDialogOpen] = useState<boolean>(false);

    const [total, setTotal] = useState<number>(0);
    const [users, setUsers] = useState<Array<User>>([]);

    const [page, setPage] = useState<number>(1);
    const [size, setSize] = useState<number>(20);

    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
        {}
    );
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
        {
            id: "group",
            value: "all",
        },
    ]);
    const debouncedColumnFilters = useDebounce(columnFilters, 100);

    // User group options
    const groupOptions = [
        { id: "all", name: "全部", icon: UserIcon },
        { id: Group.Guest.toString(), name: "访客", icon: UserIcon },
        { id: Group.Banned.toString(), name: "禁用", icon: UserXIcon },
        { id: Group.User.toString(), name: "用户", icon: UserCheckIcon },
        { id: Group.Admin.toString(), name: "管理员", icon: ShieldIcon },
    ];

    const table = useReactTable<User>({
        data: users,
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
        // 使用模拟数据替代 API 调用
        mockGetUsers({
            id: debouncedColumnFilters.find((c) => c.id === "id")?.value as number,
            username: debouncedColumnFilters.find((c) => c.id === "username")?.value as string,
            name: debouncedColumnFilters.find((c) => c.id === "nickname")?.value as string, // 将 nickname 改为 name
            email: debouncedColumnFilters.find((c) => c.id === "email")?.value as string,
            group: debouncedColumnFilters.find((c) => c.id === "group")?.value !== "all" 
                ? Number(debouncedColumnFilters.find((c) => c.id === "group")?.value) 
                : undefined,
            sorts: sorting
                .map((value) => (value.desc ? `-${value.id}` : `${value.id}`))
                .join(","),
            page,
            size,
        }).then((res) => {
            setTotal(res?.total || 0);
            setUsers(res?.data || []);
        });
        
        /* 原始 API 调用代码，现在已注释
        getUsers({
            id: debouncedColumnFilters.find((c) => c.id === "id")?.value as number,
            username: debouncedColumnFilters.find((c) => c.id === "username")?.value as string,
            name: debouncedColumnFilters.find((c) => c.id === "nickname")?.value as string, // 将 nickname 改为 name
            email: debouncedColumnFilters.find((c) => c.id === "email")?.value as string,
            group: debouncedColumnFilters.find((c) => c.id === "group")?.value !== "all" 
                ? Number(debouncedColumnFilters.find((c) => c.id === "group")?.value) 
                : undefined,
            sorts: sorting
                .map((value) => (value.desc ? `-${value.id}` : `${value.id}`))
                .join(","),
            page,
            size,
        }).then((res) => {
            setTotal(res?.total || 0);
            setUsers(res?.data || []);
        });
        */
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
                    用户管理
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
                        placeholder="UID"
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
                        placeholder={"用户名"}
                        icon={TypeIcon}
                        value={
                            (table
                                .getColumn("username")
                                ?.getFilterValue() as string) ?? ""
                        }
                        onChange={(e) =>
                            table
                                .getColumn("username")
                                ?.setFilterValue(e.target.value)
                        }
                        className={cn(["flex-1"])}
                    />
                    <Input
                        size={"sm"}
                        placeholder={"邮箱"}
                        icon={MailIcon}
                        value={
                            (table
                                .getColumn("email")
                                ?.getFilterValue() as string) ?? ""
                        }
                        onChange={(e) =>
                            table
                                .getColumn("email")
                                ?.setFilterValue(e.target.value)
                        }
                        className={cn(["flex-1"])}
                    />
                    <Select
                        size={"sm"}
                        icon={UserIcon}
                        className={cn(["flex-1"])}
                        options={groupOptions.map(group => ({
                            value: group.id,
                            content: (
                                <div
                                    className={cn([
                                        "flex",
                                        "gap-2",
                                        "items-center",
                                    ])}
                                >
                                    <group.icon className="size-4" />
                                    {group.name}
                                </div>
                            ),
                        }))}
                        onValueChange={(value) =>
                            table.getColumn("group")?.setFilterValue(value)
                        }
                        value={
                            (table
                                .getColumn("group")
                                ?.getFilterValue() as string) ?? "all"
                        }
                    />
                    <Button
                        icon={PlusCircle}
                        variant={"tonal"}
                        onClick={() => setCreateDialogOpen(true)}
                    >
                        添加用户
                    </Button>
                    <Dialog
                        open={createDialogOpen}
                        onOpenChange={setCreateDialogOpen}
                    >
                        <DialogContent>
                            <CreateUserDialog
                                onClose={() => setCreateDialogOpen(false)}
                            />
                        </DialogContent>
                    </Dialog>
                </div>
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
                                    哎呀，好像还没有用户呢。
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