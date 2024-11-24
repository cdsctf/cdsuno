import { CSSProperties } from "react";
import { Box, BoxProps } from "../Box";
import styles from "./Stack.module.scss";
import clsx from "clsx";

export interface StackProps extends BoxProps {
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

export function Stack(props: StackProps) {
    const {
        children,
        gap = "15px",
        justify = "flex-start",
        align = "baseline",
        className,
        style,
        ...rest
    } = props;

    const variables = {
        "--stack-gap": gap,
        "--stack-justify": justify,
        "--stack-align": align,
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
