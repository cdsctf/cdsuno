import { useState } from "react";
import {
    ColumnDef,
    RowData,
    StringOrTemplateHeader,
} from "@tanstack/react-table";
import { Challenge } from "@/models/challenge";
import { Badge } from "@/components/ui/badge";
import { ContentDialog } from "@/components/widgets/content-dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
    EditIcon,
    EyeIcon,
    FileIcon,
    FileTextIcon,
    Trash2Icon,
} from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { Env } from "@/models/env";
import { Card } from "@/components/ui/card";
import { cn } from "@/utils";

function DeleteConfirmDialog({
    id,
    title,
    onConfirm,
}: {
    id: string;
    title: string;
    onConfirm: () => void;
}) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
            slotProps={{
                contentProps: {
                    children: (
                        <Card className={cn(["sm:max-w-md"])}>
                            您确定要删除题目{" "}
                            <span className="font-medium">"{title}"</span> 吗？
                            <div className="py-4">
                                <p className="text-sm text-muted-foreground">
                                    此操作不可恢复，删除后该题目的所有数据将被永久移除。
                                </p>
                            </div>
                            <Button
                                variant="outline"
                                onClick={() => setOpen(false)}
                            >
                                取消
                            </Button>
                            <Button
                                level={"error"}
                                onClick={() => {
                                    onConfirm();
                                    setOpen(false);
                                }}
                            >
                                确认删除
                            </Button>
                        </Card>
                    ),
                },
            }}
        >
            <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                title="删除"
            >
                <Trash2Icon className="h-4 w-4" />
                <span className="sr-only">删除</span>
            </Button>
        </Dialog>
    );
}
