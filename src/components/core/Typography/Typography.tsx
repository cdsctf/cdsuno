import { ComponentProps } from "react";
import styles from "./Typography.module.scss";
import { Box } from "../Box";

export interface TypographyProps extends ComponentProps<"div"> {
    children: React.ReactNode;
}

export function Typography(props: TypographyProps) {
    const { children } = props;

    return <Box className={styles["root"]}>{children}</Box>;
}
