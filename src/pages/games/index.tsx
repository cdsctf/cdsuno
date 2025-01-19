import { Recent } from "./_blocks/Recent";
import { All } from "./_blocks/All";
import { useSharedStore } from "@/stores/shared";
import { useEffect } from "react";
import { Box } from "@/components/core";

export function Index() {
    const sharedStore = useSharedStore();

    useEffect(() => {
        document.title = `比赛 - ${sharedStore?.config?.site?.title}`;
    }, [sharedStore?.config?.site?.title]);

    return (
        <Box
            className={
                "flex flex-col snap-mandatory snap-y overflow-scroll h-[calc(100vh-64px)]"
            }
        >
            <Recent />
            <All />
        </Box>
    );
}
