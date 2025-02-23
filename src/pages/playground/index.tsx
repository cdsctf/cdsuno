import { Input } from "@/components/ui/input";
import { ChallengeCard } from "@/components/widgets/challenge-card";
import { Challenge, ChallengeStatus } from "@/models/challenge";
import { Search, Library } from "lucide-react";
import { cn } from "@/utils";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";

export default function Index() {
    return (
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
                />
                <Button
                    size={"lg"}
                    className={cn(["h-12"])}
                    icon={Search}
                    variant={"tonal"}
                >
                    搜索
                </Button>
            </div>
            <div className={cn(["flex-1"])}>
                <div
                    className={cn([
                        "w-[60vw]",
                        "grid",
                        "sm:grid-cols-2",
                        "xl:grid-cols-4",
                        "2xl:grid-cols-5",
                        "gap-4",
                    ])}
                >
                    <ChallengeCard
                        challenge={{
                            title: "HelloCTF",
                            category: 1,
                        }}
                    />
                    <ChallengeCard
                        challenge={{
                            title: "HelloCTF",
                            category: 2,
                        }}
                    />
                    <ChallengeCard
                        challenge={{
                            title: "HelloCTF",
                            category: 3,
                        }}
                    />
                    <ChallengeCard
                        challenge={{
                            title: "HelloCTF",
                            category: 1,
                        }}
                    />
                    <ChallengeCard
                        challenge={{
                            title: "HelloCTF",
                            category: 2,
                        }}
                    />
                    <ChallengeCard
                        challenge={{
                            title: "HelloCTF",
                            category: 3,
                        }}
                    />
                    <ChallengeCard
                        challenge={{
                            title: "HelloCTF",
                            category: 1,
                        }}
                    />
                    <ChallengeCard
                        challenge={{
                            title: "HelloCTF",
                            category: 2,
                        }}
                    />
                    <ChallengeCard
                        challenge={{
                            title: "HelloCTF",
                            category: 3,
                        }}
                    />
                    <ChallengeCard
                        challenge={{
                            title: "HelloCTF",
                            category: 1,
                        }}
                    />
                    <ChallengeCard
                        challenge={{
                            title: "HelloCTF",
                            category: 2,
                        }}
                    />
                    <ChallengeCard
                        challenge={{
                            title: "HelloCTF",
                            category: 3,
                        }}
                    />
                    <ChallengeCard
                        challenge={{
                            title: "HelloCTF",
                            category: 1,
                        }}
                    />
                    <ChallengeCard
                        challenge={{
                            title: "HelloCTF",
                            category: 2,
                        }}
                    />
                    <ChallengeCard
                        challenge={{
                            title: "HelloCTF",
                            category: 3,
                        }}
                    />
                    <ChallengeCard
                        challenge={{
                            title: "HelloCTF",
                            category: 1,
                        }}
                    />
                    <ChallengeCard
                        challenge={{
                            title: "HelloCTF",
                            category: 2,
                        }}
                    />
                    <ChallengeCard
                        challenge={{
                            title: "HelloCTF",
                            category: 3,
                        }}
                    />
                </div>
            </div>
            <Pagination total={10} value={5} onChange={() => {}} />
        </div>
    );
}
