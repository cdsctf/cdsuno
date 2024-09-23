import { useThemeStore } from "@/stores/theme";
import Sun2BoldDuotone from "~icons/solar/sun-2-bold-duotone";
import MoonBoldDuotone from "~icons/solar/moon-bold-duotone";
import Book2BoldDuotone from "~icons/solar/book-2-bold-duotone";
import FlagBoldDuotone from "~icons/solar/flag-bold-duotone";
import UsersGroupTwoRoundedBoldDuotone from "~icons/solar/users-group-two-rounded-bold-duotone";
import styles from "./Sidebar.module.scss";
import { CSSProperties } from "react";
import useThemeColor from "@/hooks/useThemeColor";
import { Tooltip } from "@/components/core";

export function Sidebar() {
    const themeStore = useThemeStore();

    const variables = {
        "--bg-color": useThemeColor("primary"),
    } as CSSProperties;

    const links = [
        {
            icon: "",
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
            <div className={styles["icon"]}>111</div>
            <div className={styles["links"]}>
                {links.map((item) => (
                    <Tooltip
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
