import { Pagination as ArkPagination } from "@ark-ui/react";
import AltArrowLeftBold from "~icons/solar/alt-arrow-left-bold";
import AltArrowRightBold from "~icons/solar/alt-arrow-right-bold";
import styles from "./Pagination.module.scss";
import { Button } from "../Button";

export interface PaginationProps {
    total: number;
    size?: number;
    value: number;
    onChange: (value: number) => void;
}

export function Pagination(props: PaginationProps) {
    const { total, size = 1, value = 1, onChange } = props;

    return (
        <ArkPagination.Root
            count={total}
            pageSize={size}
            siblingCount={2}
            page={value}
            onPageChange={(details) => onChange(details.page)}
            className={styles["root"]}
        >
            <ArkPagination.PrevTrigger asChild>
                <Button
                    className="h-[2.25rem] aspect-square p-1"
                    onClick={() => onChange(value > 1 ? value - 1 : 1)}
                    disabled={value === 1}
                    icon={<AltArrowLeftBold />}
                />
            </ArkPagination.PrevTrigger>
            <ArkPagination.Context>
                {(pagination) =>
                    pagination.pages.map((page, index) =>
                        page.type === "page" ? (
                            <ArkPagination.Item key={index} {...page} asChild>
                                <Button
                                    className="h-[2.25rem] aspect-square p-1"
                                    variant={
                                        value === page.value
                                            ? "solid"
                                            : "outlined"
                                    }
                                    icon={page.value}
                                />
                            </ArkPagination.Item>
                        ) : (
                            <ArkPagination.Ellipsis key={index} index={index}>
                                &#8230;
                            </ArkPagination.Ellipsis>
                        )
                    )
                }
            </ArkPagination.Context>
            <ArkPagination.NextTrigger asChild>
                <Button
                    className="h-[2.25rem] aspect-square p-1"
                    disabled={value === total}
                    icon={<AltArrowRightBold />}
                />
            </ArkPagination.NextTrigger>
        </ArkPagination.Root>
    );
}
