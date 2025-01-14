import { ComponentProps, CSSProperties, useContext } from "react";
import styles from "./TableCell.module.scss";
import clsx from "clsx";
import Tablelvl2Context from "../Table/Tablelvl2Context";
import ArrowDownLinear from "~icons/solar/arrow-down-linear";
import ArrowUpLinear from "~icons/solar/arrow-up-linear";
import { Flex } from "../Flex";
import { Box } from "../Box";

export interface TableCellProps
    extends Omit<ComponentProps<"th" | "td">, "align"> {
    align?: "left" | "right" | "center" | "justify" | "start" | "end";
    sortDirection?: "asc" | "desc";
    onClick?: () => void;
}

export function TableCell(props: TableCellProps) {
    const {
        align,
        sortDirection,
        style,
        children,
        className,
        onClick,
        ...rest
    } = props;

    const tablelvl2Context = useContext(Tablelvl2Context);

    const Element = tablelvl2Context === "head" ? "th" : "td";

    const variables = {
        textAlign: align,
    } as CSSProperties;

    return (
        <Element
            className={clsx(styles["root"], className)}
            style={{
                ...variables,
                ...style,
            }}
            data-clickable={onClick !== undefined}
            {...rest}
        >
            <Flex gap={5} className={styles["content"]} align={"center"}>
                <Box>{children}</Box>
                <Box>
                    {sortDirection !== undefined && (
                        <>
                            {sortDirection === "asc" && <ArrowDownLinear />}
                            {sortDirection === "desc" && <ArrowUpLinear />}
                        </>
                    )}
                </Box>
            </Flex>
        </Element>
    );
}
