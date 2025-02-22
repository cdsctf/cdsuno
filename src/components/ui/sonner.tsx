import { cn } from "@/utils";
import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

function Toaster(props: ToasterProps) {
    const { ...rest } = props;
    const { theme = "system" } = useTheme();

    return (
        <Sonner
            theme={theme as ToasterProps["theme"]}
            className={cn(["toaster", "group"])}
            toastOptions={{
                classNames: {
                    toast: cn([
                        "group",
                        "toast",
                        "group-[.toaster]:!bg-card",
                        "group-[.toaster]:!text-foreground",
                        "group-[.toaster]:!border-border",
                        "group-[.toaster]:!shadow-lg",
                    ]),
                    description: cn(["group-[.toast]:!text-muted-foreground"]),
                    actionButton: cn([
                        "group-[.toast]:!bg-primary",
                        "group-[.toast]:!text-primary-foreground",
                    ]),
                    cancelButton: cn([
                        "group-[.toast]:!bg-muted",
                        "group-[.toast]:!text-muted-foreground",
                    ]),
                },
            }}
            {...rest}
        />
    );
}

export { Toaster };
