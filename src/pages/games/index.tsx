import styles from "./index.module.scss";
import { Recent } from "./_blocks/Recent";
import { All } from "./_blocks/All";
import { useSharedStore } from "@/stores/shared";
import { useEffect } from "react";
import { Box } from "@/components/core";
import clsx from "clsx";

export function Index() {
    const sharedStore = useSharedStore();

    useEffect(() => {
        document.title = `比赛 - ${sharedStore?.config?.site?.title}`;
    }, [sharedStore?.config?.site?.title]);

    return (
        <Box className={clsx(styles["root"], "flex flex-col")}>
            <Recent />
            <All />
        </Box>
    );
}
