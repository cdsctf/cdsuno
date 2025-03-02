import { Card } from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { ScoreRecord } from "@/models/game";
import { cn } from "@/utils";
import { useEffect, useMemo, useState } from "react";
import {
    CartesianGrid,
    XAxis,
    LineChart,
    Line,
    Legend,
    Brush,
    YAxis,
} from "recharts";

interface ChampionChartProps {
    scoreboard?: Array<ScoreRecord>;
}

function ChampionChart(props: ChampionChartProps) {
    const { scoreboard } = props;

    const data = useMemo(() => {
        let result: Array<{
            ts: number;
            [key: number]: number | undefined;
        }> = [];

        scoreboard?.forEach((record) => {
            let total = 0;
            const team = record?.team;
            const submissions = record?.submissions;

            if (!team) return;

            submissions?.forEach((submission) => {
                total += Number(submission?.pts);
                const ts = Number(submission?.created_at);

                let existingEntry = result.find((entry) => entry.ts === ts);
                if (!existingEntry) {
                    existingEntry = { ts: ts };
                    result.push(existingEntry);
                }

                existingEntry[team?.id!] = total;
            });
        });

        return result;
    }, [scoreboard]);

    const [lines, setLines] = useState<
        Array<{
            id: number;
            name?: string;
        }>
    >();

    useEffect(() => {
        let result: Array<{
            id: number;
            name?: string;
        }> = [];

        scoreboard?.forEach((record) => {
            const team = record?.team;

            if (!team) return;

            result.push({
                id: team?.id!,
                name: team?.name,
            });
        });

        setLines(result);
    }, [scoreboard]);

    const chartConfig = {} satisfies ChartConfig;

    return (
        <Card className={cn(["p-10", "w-full"])}>
            <ChartContainer
                config={chartConfig}
                className={cn(["h-[20rem]", "w-full"])}
            >
                <LineChart
                    accessibilityLayer
                    data={data}
                    margin={{
                        left: 12,
                        right: 12,
                    }}
                >
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey={"ts"}
                        tickFormatter={(value: number) =>
                            new Date(value * 1000).toLocaleString(undefined, {
                                month: "2-digit",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                            })
                        }
                        scale={"auto"}
                    />
                    <YAxis />
                    <Legend />
                    <Brush
                        dataKey={"ts"}
                        height={25}
                        tickFormatter={(value: number) =>
                            new Date(value * 1000).toLocaleString(undefined, {
                                month: "2-digit",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                            })
                        }
                    />
                    <ChartTooltip
                        cursor={false}
                        content={
                            <ChartTooltipContent indicator="dot" hideLabel />
                        }
                    />

                    {lines?.map((line) => (
                        <Line
                            key={line?.id}
                            type="linear"
                            dataKey={line.id}
                            name={line.name}
                            connectNulls
                        />
                    ))}
                </LineChart>
            </ChartContainer>
        </Card>
    );
}

export { ChampionChart };
