import { ComponentProps } from "react";
import styles from "./TableHead.module.scss";
import clsx from "clsx";
import Tablelvl2Context from "../Tablelvl2Context";

export interface TableHeadProps extends ComponentProps<"thead"> {}

export function TableHead(props: TableHeadProps) {
    const { children, className, ...rest } = props;

    return (
        <Tablelvl2Context.Provider value={"head"}>
            <thead className={clsx(styles["root"], className)} {...rest}>
                {children}
            </thead>
        </Tablelvl2Context.Provider>
    );
}
