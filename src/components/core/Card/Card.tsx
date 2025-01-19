import clsx from "clsx";
import { Box, BoxProps } from "../Box";
import styles from "./Card.module.scss";

export interface CardProps extends BoxProps {}

export function Card(props: CardProps) {
    const { children, className, ...rest } = props;

    return (
        <Box className={clsx(styles["card"], className)} {...rest}>
            {children}
        </Box>
    );
}
