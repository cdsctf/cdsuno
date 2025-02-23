import * as React from "react";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    MoreHorizontalIcon,
} from "lucide-react";

import { cn } from "@/utils";
import { Button, buttonVariants } from "@/components/ui/button";

interface PaginationProps
    extends Partial<
        Omit<React.ComponentProps<typeof PaginationPrimitive>, "onChange">
    > {
    total: number;
    value: number;
    max?: number;
    onChange: (value: number) => void;
}

function Pagination(props: PaginationProps) {
    const { total, value, max, onChange, ...rest } = props;

    const paginationNodes = React.useMemo(() => {
        return generatePaginationNodes(total, value, max);
    }, [total, value, max]);

    return (
        <PaginationPrimitive {...rest}>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious />
                </PaginationItem>
                {paginationNodes?.map((node) => {
                    if (typeof node === "number") {
                        return (
                            <PaginationItem>
                                <PaginationLink
                                    isActive={node === value}
                                    onClick={() => onChange(node)}
                                >
                                    {node}
                                </PaginationLink>
                            </PaginationItem>
                        );
                    }
                    return <PaginationEllipsis />;
                })}
                <PaginationItem>
                    <PaginationNext />
                </PaginationItem>
            </PaginationContent>
        </PaginationPrimitive>
    );
}

type PaginationNode = number | "...";

function generatePaginationNodes(total: number, value: number, max?: number) {
    const items: PaginationNode[] = [];
    const maxPages = max || 5;
    const halfMaxPages = Math.floor(maxPages / 2);

    if (total <= 1) {
        return [];
    }

    let startPage = Math.max(1, value - halfMaxPages);
    let endPage = Math.min(total, value + halfMaxPages);

    if (total > maxPages) {
        if (startPage > 1) {
            items.push(1);
            if (startPage > 2) {
                items.push("...");
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            items.push(i);
        }

        if (endPage < total) {
            if (endPage < total - 1) {
                items.push("...");
            }
            items.push(total);
        }
    } else {
        for (let i = 1; i <= total; i++) {
            items.push(i);
        }
    }

    return items;
}

function PaginationPrimitive({
    className,
    ...props
}: React.ComponentProps<"nav">) {
    return (
        <nav
            role="navigation"
            aria-label="pagination"
            data-slot="pagination"
            className={cn(
                ["mx-auto", "flex", "w-full", "justify-center"],
                className
            )}
            {...props}
        />
    );
}

function PaginationContent({
    className,
    ...props
}: React.ComponentProps<"ul">) {
    return (
        <ul
            data-slot="pagination-content"
            className={cn(
                ["flex", "flex-row", "items-center", "gap-1"],
                className
            )}
            {...props}
        />
    );
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
    return <li data-slot="pagination-item" {...props} />;
}

interface PaginationLinkProps extends React.ComponentProps<typeof Button> {
    isActive?: boolean;
}

function PaginationLink({
    className,
    isActive,
    size = "md",
    ...props
}: PaginationLinkProps) {
    return (
        <Button variant={isActive ? "outline" : "ghost"} square {...props} />
    );
}

function PaginationPrevious({
    className,
    ...props
}: React.ComponentProps<typeof PaginationLink>) {
    return (
        <PaginationLink
            aria-label="Go to previous page"
            size="md"
            className={cn(["gap-1", "px-2.5", "sm:pl-2.5"], className)}
            icon={ChevronLeftIcon}
            {...props}
        />
    );
}

function PaginationNext({
    className,
    ...props
}: React.ComponentProps<typeof PaginationLink>) {
    return (
        <PaginationLink
            aria-label="Go to next page"
            size="md"
            className={cn(["gap-1", "px-2.5", "sm:pr-2.5"], className)}
            icon={ChevronRightIcon}
            {...props}
        />
    );
}

function PaginationEllipsis({
    className,
    ...props
}: React.ComponentProps<"span">) {
    return (
        <span
            aria-hidden
            data-slot="pagination-ellipsis"
            className={cn(
                ["flex", "size-9", "items-center", "justify-center"],
                className
            )}
            {...props}
        >
            <MoreHorizontalIcon className="size-4" />
            <span className="sr-only">More pages</span>
        </span>
    );
}

export { Pagination };
