import * as React from "react";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TableColumnToggleProps<TData> {
    table?: Table<TData>;
    title?: string;
    buttonProps?: React.ComponentProps<typeof Button>;
    className?: string;
}

export function TableColumnToggle<TData>({
    table,
    title = "Columns",
    buttonProps,
}: TableColumnToggleProps<TData>) {
    if (!table) return null;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button {...buttonProps}>{title}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                        return (
                            <DropdownMenuCheckboxItem
                                key={column.id}
                                className="capitalize"
                                checked={column.getIsVisible()}
                                onCheckedChange={(value) =>
                                    column.toggleVisibility(!!value)
                                }
                            >
                                {column.id}
                            </DropdownMenuCheckboxItem>
                        );
                    })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
