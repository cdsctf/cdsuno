import React, { ComponentProps, forwardRef } from "react";
import styles from "./Icon.module.scss";
import clsx from "clsx";

export interface IconProps extends ComponentProps<"i"> {
    icon?: React.ReactElement;
}

export const Icon = forwardRef<HTMLElement, IconProps>((props, ref) => {
    const { icon, className } = props;

    return (
        <i ref={ref} className={clsx(styles["root"], className)}>
            {icon}
        </i>
    );
});
