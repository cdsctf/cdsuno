import { Input } from "@/components/ui/input";
import { ChallengeCard } from "@/components/widgets/challenge-card";
import { Challenge, ChallengeStatus } from "@/models/challenge";
import { Search, Library } from "lucide-react";
import { cn } from "@/utils";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import { ListOrdered } from "lucide-react";
import { useEffect, useState } from "react";
import { getChallenges, getChallengeStatus } from "@/api/challenge";
import { useAuthStore } from "@/storages/auth";
import { Dialog } from "@/components/ui/dialog";
import { ChallengeDialog } from "@/components/widgets/challenge-dialog";

export default function Index() {
    const authStore = useAuthStore();

    const [total, setTotal] = useState<number>(0);
    const [challenges, setChallenges] = useState<Array<Challenge>>();
    const [challengeStatus, setChallengeStatus] =
        useState<Record<string, ChallengeStatus>>();

    const [doSearch, setDoSearch] = useState<number>(0);
    const [title, setTitle] = useState<string>();
    const [page, setPage] = useState<number>(1);
    const [size, setSize] = useState<number>(20);

    useEffect(() => {
        getChallenges({
            title,
            page,
            size,
            is_public: true,
            is_desensitized: true,
        }).then((res) => {
            if (res.code === 200) {
                setTotal(res.total || 0);
                setChallenges(res.data);
            }
        });
    }, [doSearch, page]);

    useEffect(() => {
        if (!challenges?.length) return;

        getChallengeStatus({
            challenge_ids: challenges?.map((challenge) => challenge.id!),
            user_id: authStore?.user?.id,
        }).then((res) => {
            setChallengeStatus(res.data);
        });
    }, [challenges]);

    const [selectedChallenge, setSelectedChallenge] = useState<Challenge>();
    const [challengeDialogOpen, setChallengeDialogOpen] =
        useState<boolean>(false);

    return (
        <>
            <div
                className={cn([
                    "flex-1",
                    "p-7",
                    "mx-auto",
                    "flex",
                    "flex-col",
                    "gap-7",
                ])}
            >
                <div className={cn(["flex", "items-center", "gap-3"])}>
                    <Input
                        icon={Library}
                        className={cn(["flex-1"])}
                        placeholder={"题目名"}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <Button
                        size={"lg"}
                        className={cn(["h-12"])}
                        icon={Search}
                        variant={"tonal"}
                        onClick={() => setDoSearch((prev) => prev + 1)}
                    >
                        搜索
                    </Button>
                </div>
                <div
                    className={cn([
                        "flex",
                        "items-center",
                        "md:justify-between",
                        "justify-center",
                    ])}
                >
                    <Pagination
                        size={"sm"}
                        total={Math.ceil(total / size)}
                        value={page}
                        onChange={setPage}
                    />
                    <div
                        className={cn(["hidden", "md:flex", "w-1/5", "gap-5"])}
                    >
                        <Input
                            type={"number"}
                            className={cn(["flex-1"])}
                            icon={ListOrdered}
                            placeholder={"每页题目数量"}
                            min={1}
                            max={50}
                            size={"sm"}
                            value={size}
                            onChange={(e) => setSize(e.target.valueAsNumber)}
                        />
                    </div>
                </div>
                <div className={cn(["flex-1"])}>
                    <div
                        className={cn([
                            "w-[60vw]",
                            "grid",
                            "sm:grid-cols-2",
                            "xl:grid-cols-4",
                            "gap-4",
                        ])}
                    >
                        {challenges?.map((challenge, index) => (
                            <ChallengeCard
                                key={index}
                                challenge={challenge}
                                status={challengeStatus?.[challenge?.id!]}
                                onClick={() => {
                                    setSelectedChallenge(challenge);
                                    setChallengeDialogOpen(true);
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <Dialog
                open={challengeDialogOpen}
                onOpenChange={setChallengeDialogOpen}
            >
                <ChallengeDialog
                    onClose={() => setChallengeDialogOpen(false)}
                    challenge={selectedChallenge}
                />
            </Dialog>
        </>
    );
}
