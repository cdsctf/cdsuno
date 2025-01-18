import clsx from "clsx";
import { Box, BoxProps } from "../Box";
import "./Card.scss";

export interface CardProps extends BoxProps {}

export function Card(props: CardProps) {
    const { children, className, ...rest } = props;

    return (
        <Box className={clsx("card", className)} {...rest}>
            {children}
        </Box>
    );
}
