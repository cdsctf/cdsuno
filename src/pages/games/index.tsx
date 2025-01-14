import styles from "./index.module.scss";
import { Stack } from "@/components/core";
import { Recent } from "./_blocks/Recent";
import { All } from "./_blocks/All";
import { useSharedStore } from "@/stores/shared";
import { useEffect } from "react";

export function Index() {
    const sharedStore = useSharedStore();

    useEffect(() => {
        document.title = `比赛 - ${sharedStore?.config?.site?.title}`;
    }, [sharedStore?.config?.site?.title]);

    return (
        <Stack className={styles["root"]} gap={0}>
            <Recent />
            <All />
        </Stack>
    );
}
