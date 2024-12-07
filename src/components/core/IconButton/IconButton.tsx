import { ComponentProps, forwardRef } from "react";

export interface IconButtonProps extends ComponentProps<"button"> {
    variant?: "solid" | "outlined" | "subtle" | "transparent";
}

export function IconButton(props: IconButtonProps) {
    const { children, ref, ...rest } = props;

    return <button ref={ref}>{children}</button>;
}
