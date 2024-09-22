import { ComponentProps } from "react";
import styles from "./Typography.module.scss";

export interface TypographyProps extends ComponentProps<"div"> {
    children: React.ReactNode;
}

export function Typography(props: TypographyProps) {
    const { children } = props;

    return <div className={styles["root"]}>{children}</div>;
}
