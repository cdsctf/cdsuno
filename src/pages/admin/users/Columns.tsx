import { User } from '@/models/user';
import { ColumnDef } from "@tanstack/react-table";

export const Columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "username",
    header: "用户名",
  },
  {
    accessorKey: "nickname",
    header: "昵称",
  },
  {
    accessorKey: "email",
    header: "邮箱",
  },
  {
    accessorKey: "group",
    header: "用户组",
  },
  {
    accessorKey: "created_at",
    header: "注册时间",
  },
]