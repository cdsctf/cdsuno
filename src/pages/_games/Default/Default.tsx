import styles from "./Default.module.scss";
import { Stack } from "@/components/core";
import { Recent } from "./Recent";

export function Default() {
    return (
        <Stack className={styles["root"]} gap={0}>
            <Recent />
            <Stack className={styles["all"]}>11</Stack>
        </Stack>
    );
}
