import * as React from "react";
import { Table } from "@tanstack/react-table";
import { cn } from "@/utils";

interface TableFiltersProps<TData> {
    children: React.ReactNode;
    table?: Table<TData>;
    className?: string;
}

export function TableFilters<TData>({
    children,
    table,
    className,
}: TableFiltersProps<TData>) {
    return (
        <div
            className={cn([
                [
                    "flex",
                    "flex-wrap",
                    "items-end",
                    "gap-4",
                    "border-b",
                    "pb-4",
                    "mb-4",
                ],
                className,
            ])}
        >
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child) && table) {
                    return React.cloneElement(child, { table } as any);
                }
                return child;
            })}
        </div>
    );
}
