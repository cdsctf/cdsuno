import { create } from "zustand";

interface ToastState {
    toasts: any[];
    addToast: (toast: any) => void;
    removeToast: (id: string) => void;
}

export const useToastStore = create<ToastState>()((set) => ({
    toasts: [],
    addToast: (message) =>
        set((state) => ({
            toasts: [...state.toasts, { id: Date.now(), message }],
        })),
    removeToast: (id) =>
        set((state) => ({
            toasts: state.toasts.filter((toast) => toast.id !== id),
        })),
}));
