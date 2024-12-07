import { ComponentProps } from "react";

export interface BoxProps extends ComponentProps<"div"> {}

export function Box(props: BoxProps) {
    const { children, ref, ...rest } = props;

    return (
        <div {...rest} ref={ref}>
            {children}
        </div>
    );
}
