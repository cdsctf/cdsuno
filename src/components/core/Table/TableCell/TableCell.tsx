import { ComponentProps, useContext } from "react";
import styles from "./TableCell.module.scss";
import clsx from "clsx";
import Tablelvl2Context from "../Tablelvl2Context";
import ArrowDownLinear from "~icons/solar/arrow-down-linear";
import ArrowUpLinear from "~icons/solar/arrow-up-linear";
import { Box } from "../../Box";

export interface TableCellProps
    extends Omit<ComponentProps<"th" | "td">, "align"> {
    justify?:
        | "flex-start"
        | "flex-end"
        | "center"
        | "space-between"
        | "space-around"
        | "space-evenly";
    sortDirection?: "asc" | "desc";
    onClick?: () => void;
}

export function TableCell(props: TableCellProps) {
    const {
        justify,
        sortDirection,
        style,
        children,
        className,
        onClick,
        ...rest
    } = props;

    const tablelvl2Context = useContext(Tablelvl2Context);

    const Element = tablelvl2Context === "head" ? "th" : "td";

    return (
        <Element
            className={clsx(styles["root"], className)}
            style={{
                ...style,
            }}
            data-clickable={onClick !== undefined}
            onClick={onClick}
            {...rest}
        >
            <Box
                className={`flex w-full items-center gap-[5px]`}
                style={{
                    justifyContent: justify,
                }}
            >
                <Box>{children}</Box>
                {sortDirection !== undefined && (
                    <Box>
                        {sortDirection === "asc" && <ArrowDownLinear />}
                        {sortDirection === "desc" && <ArrowUpLinear />}
                    </Box>
                )}
            </Box>
        </Element>
    );
}
