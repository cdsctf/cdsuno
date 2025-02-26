import * as React from "react"
import { Table } from "@tanstack/react-table"
import { Input } from "./input"

interface TableFilterProps<TData> {
  table: Table<TData>
  columnId: string
  placeholder?: string
  className?: string
  label?: string
}

export function TableFilter<TData>({
  table,
  columnId,
  placeholder = "Filter...",
  className = "max-w-sm",
  label,
}: TableFilterProps<TData>) {
  const column = table.getColumn(columnId)
  if (!column) {
    return null
  }

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium">{label}</label>}
      <Input
        placeholder={placeholder}
        value={(column.getFilterValue() as string) ?? ""}
        onChange={(event) => column.setFilterValue(event.target.value)}
        className={className}
      />
    </div>
  )
}