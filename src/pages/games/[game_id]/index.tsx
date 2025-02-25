import { cn } from "@/utils";

export default function Index() {
    return (
        <div className={cn(["mx-auto", "flex", "flex-col", "xl:flex-row"])}>
            <div className={cn(["w-full", "xl:w-1/4"])}></div>
        </div>
    );
}
