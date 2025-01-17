import clsx from "clsx";
import { Box, BoxProps } from "../Box";
import styles from "./Divider.module.scss";

export interface DividerProps extends BoxProps {
    orientation?: "horizontal" | "vertical";
    variant?: "solid" | "dashed" | "dotted";
}

export function Divider(props: DividerProps) {
    const {
        orientation = "horizontal",
        variant = "solid",
        style,
        className,
        ...rest
    } = props;

    const variables = {
        "--divider-variant": variant,
    };

    return (
        <Box
            className={clsx(styles["root"], className)}
            style={{
                ...variables,
                ...style,
            }}
            data-orientation={orientation}
            {...rest}
        />
    );
}
