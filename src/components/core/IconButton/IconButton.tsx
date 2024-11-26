import { ComponentProps, forwardRef } from "react";

export interface IconButtonProps extends ComponentProps<"button"> {
    variant?: "solid" | "outlined" | "subtle" | "transparent";
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
    (props, ref) => {
        const { children, ...rest } = props;

        return <button ref={ref}>{children}</button>;
    }
);
