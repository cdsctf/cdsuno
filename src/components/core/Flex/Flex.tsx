import { CSSProperties } from "react";
import { Box, BoxProps } from "../Box";
import styles from "./Flex.module.scss";
import clsx from "clsx";

export interface FlexProps extends BoxProps {
    gap?: string;
    justify?:
        | "flex-start"
        | "flex-end"
        | "center"
        | "space-between"
        | "space-around"
        | "space-evenly";
    align?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
}

export function Flex(props: FlexProps) {
    const {
        gap,
        justify = "flex-start",
        align = "baseline",
        children,
        className,
        style,
        ...rest
    } = props;

    const variables = {
        "--flex-gap": gap,
        "--flex-justify": justify,
        "--flex-align": align,
    } as CSSProperties;

    return (
        <Box
            className={clsx(styles["root"], className)}
            style={{
                ...variables,
                ...style,
            }}
            {...rest}
        >
            {children}
        </Box>
    );
}
