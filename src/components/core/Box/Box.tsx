import { ComponentProps, forwardRef } from "react";

export interface BoxProps extends ComponentProps<"div"> {}

export const Box = forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
    const { children, ...rest } = props;

    return (
        <div {...rest} ref={ref}>
            {children}
        </div>
    );
});
