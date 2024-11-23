import { CSSProperties, ReactNode } from "react";
import styles from "./Wrapper.module.scss";

interface WrapperProps {
    children: ReactNode;
    variables: CSSProperties;
}

export function Wrapper({ children, variables }: WrapperProps) {
    return (
        <div className={styles.wrapper} style={variables}>
            {children}
        </div>
    );
}
