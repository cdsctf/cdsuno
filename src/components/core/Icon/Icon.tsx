import React, { ComponentProps, forwardRef } from "react";
import styles from "./Icon.module.scss";
import clsx from "clsx";

export interface IconProps extends ComponentProps<"i"> {
    icon?: React.ReactElement;
}

export function Icon(props: IconProps) {
    const { icon, className, ref, ...rest } = props;

    return (
        <i ref={ref} className={clsx(styles["root"], className)} {...rest}>
            {icon}
        </i>
    );
}
