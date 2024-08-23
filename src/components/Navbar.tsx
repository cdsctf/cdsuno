import { useUnoStore } from "@/stores/uno";
import '@/styles/main.scss'
export default function Navbar() {
    return (
        <div
            h="4rem"
            w="full"
            z="2"
            px="8"
            bg="gray-7"
            flex="inline"
            shadow="lg"
            items="center"
            justify="between"
            position="fixed"
        >
            <div w="50%"></div>
            <div flex="inline shrink-0" gap="3">
                <button
                    bg="#6556d7"
                    p="x-5 y-3"
                    rounded="lg"
                    font="bold"
                    transition="all ease-in-out duration-300"
                >
                    题库|Training Club
                </button>
                <button bg="primary-1" p="x-5 y-3" rounded="lg">
                    比赛|Races
                </button>
                <button bg="#6556d7" p="x-5 y-3" rounded="lg">
                    团队|Teams
                </button>
            </div>
            <div w="50%" flex="inline" justify="end">
                <button
                    onClick={() => {
                        useUnoStore
                            .getState()
                            .setDarkMode(!useUnoStore.getState().darkMode);
                    }}
                >
                    {useUnoStore.getState().darkMode ? (
                        <div
                            text="2xl gray-2"
                            className="i-solar-moon-bold-duotone"
                        />
                    ) : (
                        <div
                            text="2xl gray-2"
                            className="i-solar-sun-2-bold-duotone"
                        />
                    )}
                </button>
            </div>
        </div>
    );
}
