import React, { ComponentProps, forwardRef } from "react";

export interface IconProps extends ComponentProps<"i"> {
    icon: React.ReactElement;
}

export const Icon = forwardRef<HTMLElement, IconProps>((props, ref) => {
    const { icon } = props;

    return <i ref={ref}>{icon}</i>;
});
