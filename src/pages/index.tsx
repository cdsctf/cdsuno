import { useConfigStore } from "@/storages/config";
import { cn } from "@/utils";

export default function () {
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
            <img
                alt="logo"
                decoding={"async"}
                src={"/api/configs/icon"}
                draggable={false}
                className={cn(["drop-shadow-md", "aspect-square", "h-[15rem]"])}
            />
            <h1 className={cn(["text-3xl", "lg:text-4xl", "font-extrabold"])}>
                {configStore?.config?.meta?.title}
            </h1>
            <span>{configStore?.config?.meta?.description}</span>
        </div>
    );
}
