import clsx from "clsx";
import { Box, BoxProps } from "../Box";
import "./Divider.scss";

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
            className={clsx("divider", className)}
            style={{
                ...variables,
                ...style,
            }}
            data-orientation={orientation}
            {...rest}
        />
    );
}
