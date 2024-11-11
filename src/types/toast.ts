import React from "react";

export interface Toast {
    id?: string;
    title: string;
    description: string;
    type: "success" | "error" | "info" | "warning";
    duration: number;
    icon?: React.ReactElement;
}
