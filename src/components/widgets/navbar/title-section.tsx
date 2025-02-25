import { cn } from "@/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router";
import { useConfigStore } from "@/storages/config";
import { useContext } from "react";
import { Context } from "./context";
import { useGameStore } from "@/storages/game";
import { Image } from "@/components/ui/image";
import { Flag } from "lucide-react";

interface TitleSectionProps
    extends Omit<React.ComponentProps<typeof Link>, "to"> {}

function TitleSection(props: TitleSectionProps) {
    const { className, ...rest } = props;
    const { mode } = useContext(Context);
    const { currentGame } = useGameStore();
    const configStore = useConfigStore();

    return (
        <Link
            className={cn([
                "flex",
                "gap-3",
                "items-center",
                "text-foreground",
                className,
            ])}
            to={mode === "default" ? "/" : `/games/${currentGame?.id}`}
            {...rest}
        >
            <Image
                src={
                    mode === "default"
                        ? "/api/configs/icon"
                        : `/api/games/${currentGame?.id}/icon`
                }
                fallback={<Flag />}
                className={cn([
                    "drop-shadow-md",
                    "h-10",
                    "w-10",
                    "rounded-lg",
                    "overflow-hidden",
                ])}
            />
            <h1 className={cn(["text-xl", "font-semibold"])}>
                {mode === "default"
                    ? configStore?.config?.meta?.title
                    : currentGame?.title}
            </h1>
        </Link>
    );
}

export { TitleSection };
