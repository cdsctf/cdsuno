import { useThemeStore } from "@/stores/theme";
import Sun2BoldDuotone from "~icons/solar/sun-2-bold-duotone";
import MoonBoldDuotone from "~icons/solar/moon-bold-duotone";
import Book2BoldDuotone from "~icons/solar/book-2-bold-duotone";
import FlagBoldDuotone from "~icons/solar/flag-bold-duotone";
import UsersGroupTwoRoundedBoldDuotone from "~icons/solar/users-group-two-rounded-bold-duotone";
import PlanetBoldDuotone from "~icons/solar/planet-bold-duotone";
import styles from "./Sidebar.module.scss";
import { CSSProperties } from "react";
import useThemeColor from "@/hooks/useThemeColor";
import { Tooltip } from "@/components/core";
import chroma from "chroma-js";

export function Sidebar() {
    const themeStore = useThemeStore();

    const baseColor = useThemeColor("primary");

    const variables = {
        "--bg-color": chroma(baseColor).hex(),
        "--border-color": chroma(baseColor).hex(),
    } as CSSProperties;

    const links = [
        {
            icon: <PlanetBoldDuotone />,
            label: "主页",
            href: "/",
        },
        {
            icon: <Book2BoldDuotone />,
            label: "题库",
            href: "/challenges",
        },
        {
            icon: <FlagBoldDuotone />,
            label: "比赛",
            href: "/games",
        },
        {
            icon: <UsersGroupTwoRoundedBoldDuotone />,
            label: "团队",
            href: "/teams",
        },
    ];

    return (
        <div className={styles["root"]} style={variables}>
            <div className={styles["icon"]}>
                <img
                    src="/cm2.png"
                    width={36}
                    height={36}
                    alt="icon"
                    draggable={false}
                />
            </div>
            <div className={styles["links"]}>
                {links.map((item) => (
                    <Tooltip
                        key={item.label}
                        content={item.label}
                        position={"right"}
                        offset={25}
                    >
                        <div className={styles["link"]}>{item?.icon}</div>
                    </Tooltip>
                ))}
            </div>
            <div className={styles["menu"]}>
                <button
                    onClick={() => {
                        themeStore.setDarkMode(!themeStore.darkMode);
                    }}
                >
                    {themeStore.darkMode ? (
                        <>
                            <Sun2BoldDuotone />
                        </>
                    ) : (
                        <>
                            <MoonBoldDuotone />
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
