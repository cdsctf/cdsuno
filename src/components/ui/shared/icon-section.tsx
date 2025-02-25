import { cn } from "@/utils";
import { cva, VariantProps } from "class-variance-authority";
import { LucideIcon } from "lucide-react";

const iconSectionVariants = cva(
    [
        "rounded-l-md",
        "flex",
        "items-center",
        "justify-center",
        "aspect-square",
        "bg-primary/20",
        "text-foreground",
    ],
    {
        variants: {
            size: {
                sm: "h-10",
                md: "h-12",
            },
        },
        defaultVariants: {
            size: "md",
        },
    }
);

interface IconSectionProps extends VariantProps<typeof iconSectionVariants> {
    icon: LucideIcon;
}

function IconSection(props: IconSectionProps) {
    const { icon, size, ...rest } = props;

    const Icon = icon;

    return (
        <div className={cn(iconSectionVariants({ size }))} {...rest}>
            <Icon className={cn(["size-4"])} />
        </div>
    );
}

export { IconSection };
