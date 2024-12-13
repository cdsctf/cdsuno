import { useMemo } from "react";
import { Box } from "../Box";
import { Flex } from "../Flex";
import { IconButton } from "../IconButton";
import styles from "./Pagination.module.scss";
import AltArrowLeftBold from "~icons/solar/alt-arrow-left-bold";
import AltArrowRightBold from "~icons/solar/alt-arrow-right-bold";
import React from "react";

export interface PaginationProps {
    total: number;
    value: number;
    onChange: (value: number) => void;
}

export function Pagination(props: PaginationProps) {
    const { total, value, onChange } = props;

    const pages = useMemo(() => {
        const PAGE_RANGE = 5;
        const pages = [];
        const max = total;
        const current = value;

        if (max <= PAGE_RANGE) {
            for (let i = 1; i <= max; i++) {
                pages.push(i);
            }
        } else {
            let start = current - Math.floor(PAGE_RANGE / 2);
            let end = current + Math.floor(PAGE_RANGE / 2);

            if (start < 1) {
                start = 1;
                end = PAGE_RANGE;
            }

            if (end > max) {
                end = max;
                start = max - PAGE_RANGE + 1;
            }

            if (start > 1) {
                pages.push(1);
                if (start > 2) pages.push(-1); // -1 represents "..."
            }

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (end < max) {
                if (end < max - 1) pages.push(-1); // -1 represents "..."
                pages.push(max);
            }
        }

        return pages;
    }, [total, value]);

    return (
        <Flex className={styles["root"]} gap={"5px"} align={"center"}>
            <IconButton
                onClick={() => onChange(value > 1 ? value - 1 : 1)}
                disabled={value === 1}
            >
                <AltArrowLeftBold />
            </IconButton>
            {pages.map((page) => (
                <React.Fragment key={page}>
                    {page === -1 ? (
                        <Box className={styles["separator"]}>...</Box>
                    ) : (
                        <IconButton
                            variant={value === page ? "solid" : "outlined"}
                            onClick={() => onChange(page)}
                        >
                            {page}
                        </IconButton>
                    )}
                </React.Fragment>
            ))}
            <IconButton
                onClick={() => onChange(value < total ? value + 1 : total)}
                disabled={value === total}
            >
                <AltArrowRightBold />
            </IconButton>
        </Flex>
    );
}
