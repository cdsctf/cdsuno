import { ComponentProps } from "react";
import styles from "./Table.module.scss";
import clsx from "clsx";
import TableContext from "./TableContext";

export interface TableProps extends ComponentProps<"table"> {}

export function Table(props: TableProps) {
    const { children, className, ...rest } = props;

    return (
        <TableContext.Provider value={"table"}>
            <table className={clsx(styles["root"], className)} {...rest}>
                {children}
            </table>
        </TableContext.Provider>
    );
}
