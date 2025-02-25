import { cn } from "@/utils";
import { TeamCard } from "./team-card";
import { useEffect, useState } from "react";
import { GameChallenge } from "@/models/game_challenge";
import { getGameChallenges } from "@/api/game";
import { useGameStore } from "@/storages/game";
import { Challenge, ChallengeStatus } from "@/models/challenge";
import { getChallengeStatus } from "@/api/challenge";
import { ChallengeCard } from "@/components/widgets/challenge-card";
import { Dialog } from "@/components/ui/dialog";
import { ChallengeDialog } from "@/components/widgets/challenge-dialog";

export default function Index() {
    const { currentGame, selfGameTeam } = useGameStore();
    const [gameChallenges, setGameChallenges] =
        useState<Array<GameChallenge>>();
    const [challengeStatus, setChallengeStatus] =
        useState<Record<string, ChallengeStatus>>();
    const [total, setTotal] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [size, setSize] = useState<number>(20);

    const [selectedChallenge, setSelectedChallenge] = useState<Challenge>();
    const [challengeDialogOpen, setChallengeDialogOpen] =
        useState<boolean>(false);

    useEffect(() => {
        getGameChallenges({
            game_id: currentGame?.id!,
            is_enabled: true,
            page,
            size,
        }).then((res) => {
            setTotal(total);
            setGameChallenges(res.data);
        });
    }, [size, page]);

    useEffect(() => {
        if (gameChallenges) {
            getChallengeStatus({
                challenge_ids: gameChallenges?.map(
                    (gameChallenge) => gameChallenge?.challenge_id!
                ),
                team_id: selfGameTeam?.team_id,
                game_id: currentGame?.id,
            }).then((res) => {
                setChallengeStatus(res.data);
            });
        }
    }, [gameChallenges]);

    return (
        <>
            <div className={cn(["flex", "justify-evenly", "mx-auto", "my-10"])}>
                <div className={cn(["w-3/4"])}>
                    <div
                        className={cn([
                            "w-[60vw]",
                            "grid",
                            "sm:grid-cols-2",
                            "xl:grid-cols-4",
                            "gap-4",
                        ])}
                    >
                        {gameChallenges?.map((gameChallenge, index) => (
                            <ChallengeCard
                                key={index}
                                challenge={gameChallenge?.challenge}
                                status={
                                    challengeStatus?.[
                                        gameChallenge?.challenge_id!
                                    ]
                                }
                                onClick={() => {
                                    setSelectedChallenge(
                                        gameChallenge?.challenge
                                    );
                                    setChallengeDialogOpen(true);
                                }}
                            />
                        ))}
                    </div>
                </div>
                <div className={cn(["w-1/4"])}>
                    <TeamCard />
                </div>
            </div>
            <Dialog
                open={challengeDialogOpen}
                onOpenChange={setChallengeDialogOpen}
            >
                <ChallengeDialog
                    onClose={() => setChallengeDialogOpen(false)}
                    challenge={selectedChallenge}
                    gameTeam={selfGameTeam}
                />
            </Dialog>
        </>
    );
}
