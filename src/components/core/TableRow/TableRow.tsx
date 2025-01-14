import clsx from "clsx";
import { ComponentProps } from "react";
import styles from "./TableRow.module.scss";

export interface TableRowProps extends ComponentProps<"tr"> {}

export function TableRow(props: TableRowProps) {
    const { children, className, ...rest } = props;

    return (
        <tr className={clsx(styles["root"], className)} {...rest}>
            {children}
        </tr>
    );
}
