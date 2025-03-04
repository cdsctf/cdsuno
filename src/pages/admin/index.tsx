import { useDecryptedText } from "@/hooks/use-decrypted-text";
import { useConfigStore } from "@/storages/config";
import { cn } from "@/utils";
import { CodeXmlIcon } from "lucide-react";

export default function Index() {
    const configStore = useConfigStore();
    const title = useDecryptedText({
        text: configStore?.config?.meta?.title || "",
        speed: 100,
    });

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
            <CodeXmlIcon
                className={cn([
                    "drop-shadow-md",
                    "aspect-square",
                    "size-[12rem]",
                ])}
                strokeWidth={1.25}
            />
            <h1 className={cn(["text-3xl", "lg:text-4xl", "font-extrabold"])}>
                {title}
            </h1>
        </div>
    );
}
