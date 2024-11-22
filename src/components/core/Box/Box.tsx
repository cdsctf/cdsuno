import { ComponentProps } from "react";

export interface BoxProps extends ComponentProps<"div"> {}

export function Box(props: BoxProps) {
    const { children, ...rest } = props;

    return <div {...rest}>{children}</div>;
}
