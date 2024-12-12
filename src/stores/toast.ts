import { Toast } from "@/types/toast";
import { create } from "zustand";
import { nanoid } from "nanoid";

interface ToastState {
    toasts: Array<Toast>;
    add: (toast: Toast) => string;
    update: (id?: string, toast?: Toast) => void;
    remove: (id?: string) => void;
}

export const useToastStore = create<ToastState>()((set) => ({
    toasts: [],
    add: (toast) => {
        const id = toast.id || nanoid();
        const duration = toast.duration || 3000;
        const removedAt = Date.now() + duration;
        set((state) => ({
            toasts: [
                ...state.toasts,
                {
                    id: id,
                    removedAt: removedAt,
                    ...toast,
                },
            ],
        }));
        return id;
    },
    update: (id, toast) => {
        const duration = toast?.duration || 3000;
        const removedAt = Date.now() + duration;
        set((state) => ({
            toasts: state.toasts.map((t) =>
                t.id === id
                    ? {
                          ...t,
                          ...toast,
                          removedAt: removedAt,
                      }
                    : t
            ),
        }));
    },
    remove: (id) =>
        set((state) => ({
            toasts: state.toasts.filter((toast) => toast.id !== id),
        })),
}));
