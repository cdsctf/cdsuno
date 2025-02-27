import * as React from "react";
import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils";
import { LucideIcon } from "lucide-react";

interface TableFilterProps<TData> {
    table?: Table<TData>;
    columnId: string;
    placeholder?: string;
    className?: string;
    label?: string;
    icon?: LucideIcon;
}

export function TableFilter<TData>({
    icon,
    table,
    columnId,
    placeholder = "Filter...",
    className = "max-w-sm",
    label,
}: TableFilterProps<TData>) {
    const column = table?.getColumn(columnId);

    if (!column) {
        return null;
    }

    return (
        <div className={cn(["flex", "flex-col", "gap-1", "flex-1"])}>
            {label && (
                <label className={cn(["text-sm", "font-medium"])}>
                    {label}
                </label>
            )}
            <Input
                icon={icon}
                placeholder={placeholder}
                value={(column.getFilterValue() as string) ?? ""}
                onChange={(event) => column.setFilterValue(event.target.value)}
                className={cn(["flex-1", className])}
            />
        </div>
    );
}
