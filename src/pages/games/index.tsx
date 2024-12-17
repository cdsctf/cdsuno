import styles from "./index.module.scss";
import { Stack } from "@/components/core";
import { Recent } from "./_blocks/Recent";
import { All } from "./_blocks/All";

export function Index() {
    return (
        <Stack className={styles["root"]} gap={0}>
            <Recent />
            <All />
        </Stack>
    );
}
