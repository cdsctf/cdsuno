import * as React from "react"
import { Table } from "@tanstack/react-table"

interface TableFiltersProps<TData> {
  children: React.ReactNode
  table?: Table<TData>
  className?: string
}

export function TableFilters<TData>({
  children,
  table,
  className = "flex flex-wrap items-end gap-4 border-b pb-4 mb-4",
}: TableFiltersProps<TData>) {
  return (
    <div className={className}>
      {React.Children.map(children, child => {
        // 如果子元素是 React 元素，则传递 table 属性
        if (React.isValidElement(child) && table) {
          return React.cloneElement(child, { table } as any);
        }
        return child;
      })}
    </div>
  );
}