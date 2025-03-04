import { useDecryptedText } from "@/hooks/use-decrypted-text";
import { useConfigStore } from "@/storages/config";
import { cn } from "@/utils";

export default function () {
    const configStore = useConfigStore();
    const title = useDecryptedText({
        text: configStore?.config?.meta?.title || "",
        speed: 100,
    });
    const description = useDecryptedText({
        text: configStore?.config?.meta?.description || "",
        speed: 25,
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
            <img
                alt="logo"
                decoding={"async"}
                src={"/api/configs/icon"}
                draggable={false}
                className={cn(["drop-shadow-md", "aspect-square", "h-[15rem]"])}
            />
            <h1 className={cn(["text-3xl", "lg:text-4xl", "font-extrabold"])}>
                {title}
            </h1>
            <span>{description}</span>
        </div>
    );
}
