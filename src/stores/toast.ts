import { Toast } from "@/types/toast";
import { create } from "zustand";
import { nanoid } from "nanoid";

interface ToastState {
    toasts: Array<Toast>;
    add: (toast: Toast) => void;
    update: (id?: string, toast?: Toast) => void;
    remove: (id?: string) => void;
}

export const useToastStore = create<ToastState>()((set) => ({
    toasts: [],
    add: (toast) =>
        set((state) => ({
            toasts: [
                ...state.toasts,
                {
                    id: toast.id || nanoid(),
                    ...toast,
                },
            ],
        })),
    update: (id, toast) =>
        set((state) => ({
            toasts: state.toasts.map((t) =>
                t.id === id ? { ...t, ...toast } : t
            ),
        })),
    remove: (id) =>
        set((state) => ({
            toasts: state.toasts.filter((toast) => toast.id !== id),
        })),
}));
