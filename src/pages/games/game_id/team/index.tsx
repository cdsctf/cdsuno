import { useGameStore } from "@/storages/game";

export default function Index() {
    const { currentGame, selfTeam } = useGameStore();

    return <div>123</div>;
}
