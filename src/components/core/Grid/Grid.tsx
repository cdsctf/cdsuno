import { CSSProperties } from "react";
import { Box, BoxProps } from "../Box";
import styles from "./Grid.module.scss";
import clsx from "clsx";

export interface GridProps extends BoxProps {
    width?: string | number;
    item?: {
        width?: string | number;
        height?: string | number;
    };
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

export function Grid(props: GridProps) {
    const {
        width = "auto",
        item = {
            width: "auto",
            height: "auto",
        },
        gap,
        justify,
        align,
        style,
        className,
        ...rest
    } = props;

    const variabels = {
        "--grid-width": typeof width == "string" ? width : `${width}px`,
        "--grid-item-width":
            typeof item?.width == "string" ? item?.width : `${item?.width}px`,
        "--grid-item-height":
            typeof item?.height == "string"
                ? item?.height
                : `${item?.height}px`,
        "--grid-gap": typeof gap == "string" ? gap : `${gap}px`,
        "--grid-justify": justify,
        "--grid-align": align,
    } as CSSProperties;

    return (
        <Box
            className={clsx(styles["root"], className)}
            style={{
                ...variabels,
                ...style,
            }}
            {...rest}
        ></Box>
    );
}
