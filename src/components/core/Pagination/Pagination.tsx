import { IconButton } from "../IconButton";
import { Pagination as ArkPagination } from "@ark-ui/react";
import AltArrowLeftBold from "~icons/solar/alt-arrow-left-bold";
import AltArrowRightBold from "~icons/solar/alt-arrow-right-bold";
import styles from "./Pagination.module.scss";

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
            <ArkPagination.PrevTrigger>
                <IconButton
                    onClick={() => onChange(value > 1 ? value - 1 : 1)}
                    disabled={value === 1}
                >
                    <AltArrowLeftBold />
                </IconButton>
            </ArkPagination.PrevTrigger>
            <ArkPagination.Context>
                {(pagination) =>
                    pagination.pages.map((page, index) =>
                        page.type === "page" ? (
                            <ArkPagination.Item key={index} {...page}>
                                <IconButton
                                    variant={
                                        value === page.value
                                            ? "solid"
                                            : "outlined"
                                    }
                                >
                                    {page.value}
                                </IconButton>
                            </ArkPagination.Item>
                        ) : (
                            <ArkPagination.Ellipsis key={index} index={index}>
                                &#8230;
                            </ArkPagination.Ellipsis>
                        )
                    )
                }
            </ArkPagination.Context>
            <ArkPagination.NextTrigger>
                <IconButton disabled={value === total}>
                    <AltArrowRightBold />
                </IconButton>
            </ArkPagination.NextTrigger>
        </ArkPagination.Root>
        // <Flex className={styles["root"]} gap={"5px"} align={"center"}>
        //     <IconButton
        //         onClick={() => onChange(value > 1 ? value - 1 : 1)}
        //         disabled={value === 1}
        //     >
        //         <AltArrowLeftBold />
        //     </IconButton>
        //     {pages.map((page) => (
        //         <React.Fragment key={page}>
        //             {page === -1 ? (
        //                 <Box className={styles["separator"]}>...</Box>
        //             ) : (
        // <IconButton
        //     variant={value === page ? "solid" : "outlined"}
        //     onClick={() => onChange(page)}
        // >
        //     {page}
        // </IconButton>
        //             )}
        //         </React.Fragment>
        //     ))}
        // <IconButton
        //     onClick={() => onChange(value < total ? value + 1 : total)}
        //     disabled={value === total}
        // >
        //     <AltArrowRightBold />
        // </IconButton>
        // </Flex>
    );
}
