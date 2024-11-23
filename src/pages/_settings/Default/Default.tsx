import Book2BoldDuotone from "~icons/solar/book-2-bold-duotone";
import FlagBoldDuotone from "~icons/solar/flag-bold-duotone";
import UsersGroupTwoRoundedBoldDuotone from "~icons/solar/users-group-two-rounded-bold-duotone";
import SolarSettingsBoldDuotone from "~icons/solar/settings-bold-duotone";
import SolarFiltersBoldDuotone from "~icons/solar/filters-bold-duotone";
import { Navbar } from "@/components/widgets/Navbar";
import SolarRoundArrowLeftBoldDuotone from "~icons/solar/round-arrow-left-bold-duotone";
import { Outlet } from "react-router-dom";
import styles from "./Default.module.scss";

export function Default() {
    const SettingLinks = [
        {
            icon: <Book2BoldDuotone />,
            label: "题库管理",
            href: "/settings/challenges",
        },
        {
            icon: <FlagBoldDuotone />,
            label: "比赛管理",
            href: "/settings/games",
        },
        {
            icon: <UsersGroupTwoRoundedBoldDuotone />,
            label: "用户管理",
            href: "/settings/users",
        },
        {
            icon: <SolarSettingsBoldDuotone />,
            label: "系统设置",
            href: "/settings/system",
        },
        {
            icon: <SolarFiltersBoldDuotone />,
            label: "外观设置",
            href: "/settings/appearance",
        },
        {
            icon: <SolarRoundArrowLeftBoldDuotone />,
            label: "返回上级",
            href: "/",
        },
    ];

    return (
        <>
            <Navbar links={SettingLinks} />
            <main className={styles["main"]}>
                <Outlet />
            </main>
        </>
    );
}
