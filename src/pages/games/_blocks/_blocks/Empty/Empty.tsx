import { Box } from "@/components/core";
import FlagBoldDuotone from "~icons/solar/flag-bold-duotone";
import clsx from "clsx";

export function Empty() {
    return (
        <Box
            className={clsx(
                "flex flex-col justify-center items-center text-[1.5em] select-none",
                "absolute top-1/2 left-1/2 -translate-1/2"
            )}
        >
            <FlagBoldDuotone className="text-primary dark:text-white text-[5rem]" />
            暂无比赛
        </Box>
    );
}
