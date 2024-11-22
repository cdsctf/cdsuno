import { CSSProperties } from "react";
import { Box, BoxProps } from "../Box";
import styles from "./Stack.module.scss";
import clsx from "clsx";

export interface StackProps extends BoxProps {
    gap?: string;
}

export function Stack(props: StackProps) {
    const { children, gap = "15px", className, style, ...rest } = props;

    const variables = {
        "--stack-gap": gap,
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
