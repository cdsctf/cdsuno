import { Stack } from "@/components/core";
import FlagBoldDuotone from "~icons/solar/flag-bold-duotone";
import styles from "./Empty.module.scss";

export function Empty() {
    return (
        <Stack className={styles["root"]}>
            <FlagBoldDuotone
                style={{
                    color: "light-dark(var(--color-primary), white)",
                    rotate: "15deg",
                }}
            />
            暂无比赛
        </Stack>
    );
}
