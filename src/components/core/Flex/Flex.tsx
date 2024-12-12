import { CSSProperties } from "react";
import { Box, BoxProps } from "../Box";
import styles from "./Flex.module.scss";
import clsx from "clsx";

export interface FlexProps extends BoxProps {
    width?: string | number;
    gap?: string | number;
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
        width = "auto",
        gap = 0,
        justify = "flex-start",
        align = "baseline",
        children,
        className,
        style,
        ...rest
    } = props;

    const variables = {
        "--flex-width": typeof width === "string" ? width : `${width}px`,
        "--flex-gap": typeof gap === "string" ? gap : `${gap}px`,
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
