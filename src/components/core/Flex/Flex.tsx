import { CSSProperties } from "react";
import { Box, BoxProps } from "../Box";
import styles from "./Flex.module.scss";
import clsx from "clsx";

export interface FlexProps extends BoxProps {
    gap?: string;
}

export function Flex(props: FlexProps) {
    const { gap, children, className, style, ...rest } = props;

    const variables = {
        "--flex-gap": gap,
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
