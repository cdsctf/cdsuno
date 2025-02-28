import * as React from "react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { EyeIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ContentDialogProps {
    title: string;
    content: React.ReactNode | string;
    triggerText?: string;
    maxPreviewLength?: number;
    showPreview?: boolean; // 新增属性
}

export function ContentDialog({
    title,
    content,
    triggerText = "查看",
    maxPreviewLength = 10,
    showPreview = true, // 默认显示预览
}: ContentDialogProps) {
    const contentString =
        typeof content === "string" ? content : JSON.stringify(content);
    const preview =
        contentString.length > maxPreviewLength
            ? contentString.substring(0, maxPreviewLength) + "..."
            : contentString;

    return (
        <Dialog
            slotProps={{
                content: {
                    children: (
                        <Card className="sm:max-w-2xl">
                            {typeof content === "string" ? (
                                <pre className="bg-muted p-4 rounded-md overflow-auto max-h-96 whitespace-pre-wrap">
                                    {content}
                                </pre>
                            ) : (
                                <pre className="bg-muted p-4 rounded-md overflow-auto max-h-96 whitespace-pre-wrap">
                                    {JSON.stringify(content, null, 2)}
                                </pre>
                            )}
                        </Card>
                    ),
                },
            }}
        >
            <div className="flex items-center">
                {showPreview && (
                    <span className="truncate max-w-xs">{preview}</span>
                )}
                <Button
                    variant="ghost"
                    size="sm"
                    className={showPreview ? "ml-2 h-8 px-2" : "h-8 w-8 p-0"}
                >
                    <EyeIcon className="h-4 w-4" />
                </Button>
            </div>
        </Dialog>
    );
}
