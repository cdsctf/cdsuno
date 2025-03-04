import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useDecryptedText } from "@/hooks/use-decrypted-text";
import { useConfigStore } from "@/storages/config";
import { cn } from "@/utils";
import { CodeXmlIcon, StarIcon } from "lucide-react";

export default function Index() {
    const configStore = useConfigStore();

    return (
        <div
            className={cn([
                "flex-1",
                "flex",
                "flex-col",
                "items-center",
                "justify-center",
                "select-none",
            ])}
        >
            <div
                className={cn([
                    "max-w-3xl",
                    "w-full",
                    "flex",
                    "flex-col",
                    "items-center",
                    "justify-center",
                    "select-none",
                    "gap-5",
                ])}
            >
                <div className={cn(["flex", "gap-5", "items-center"])}>
                    <img
                        alt="logo"
                        decoding={"async"}
                        src={"/logo.svg"}
                        draggable={false}
                        className={cn([
                            "drop-shadow-md",
                            "aspect-square",
                            "h-17.5",
                        ])}
                    />
                    <div className={cn(["flex", "flex-col", "gap-1"])}>
                        <h1
                            className={cn([
                                "text-2xl",
                                "lg:text-3xl",
                                "font-extrabold",
                            ])}
                        >
                            CdsCTF
                        </h1>
                        <p className={cn(["font-mono"])}>123</p>
                    </div>
                </div>
                <Separator className={cn(["w-full"])} />
                <h3>Developers</h3>
                <div
                    className={cn([
                        "flex",
                        "flex-wrap",
                        "justify-center",
                        "gap-3",
                    ])}
                >
                    <Button
                        className={cn(["rounded-full"])}
                        icon={StarIcon}
                        size={"sm"}
                        variant={"tonal"}
                    >
                        ElaBosak233
                    </Button>
                    <Button
                        className={cn(["rounded-full"])}
                        icon={StarIcon}
                        size={"sm"}
                        variant={"tonal"}
                    >
                        Ec3o
                    </Button>
                </div>
                <h3>Additional Supports</h3>
                <Button
                    className={cn(["rounded-full"])}
                    icon={StarIcon}
                    size={"sm"}
                    variant={"tonal"}
                >
                    AlbertKnight
                </Button>
            </div>
        </div>
    );
}
