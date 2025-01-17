import { ComponentProps } from "react";
import Tablelvl2Context from "../Tablelvl2Context";
import styles from "./TableBody.module.scss";
import clsx from "clsx";

export interface TableBodyProps extends ComponentProps<"tbody"> {}

export function TableBody(props: TableBodyProps) {
    const { children, className, ...rest } = props;

    return (
        <Tablelvl2Context.Provider value={"body"}>
            <tbody className={clsx(styles["root"], className)} {...rest}>
                {children}
            </tbody>
        </Tablelvl2Context.Provider>
    );
}
