import { Category } from "@/models/category";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import StarFallBoldDuotone from "~icons/solar/star-fall-bold-duotone";
import ChatRoundMoneyBoldDuotone from "~icons/solar/chat-round-money-bold-duotone";
import Planet2BoldDuotone from "~icons/solar/planet-2-bold-duotone";

interface CategoryState {
    categories: Array<Category>;
    setCategories: (categories: Array<Category>) => void;
    getCategory: (id?: number) => Category | undefined;
}

export const useCategoryStore = create<CategoryState>()(
    persist(
        (set, get) => ({
            categories: [
                {
                    id: 1,
                    name: "misc",
                    color: "#3F51B5",
                    icon: <StarFallBoldDuotone />,
                },
                {
                    id: 2,
                    name: "web",
                    color: "#009688",
                    icon: <Planet2BoldDuotone />,
                },
                {
                    id: 3,
                    name: "reverse",
                    color: "#FF5722",
                },
                {
                    id: 4,
                    name: "crypto",
                    color: "#FFC107",
                },
                {
                    id: 5,
                    name: "forensics",
                    color: "#9C27B0",
                },
                {
                    id: 6,
                    name: "mobile",
                    color: "#2196F3",
                },
                {
                    id: 7,
                    name: "pwn",
                    color: "#FF9800",
                },
                {
                    id: 8,
                    name: "steganography",
                    color: "#795548",
                },
                {
                    id: 9,
                    name: "osint",
                    color: "#4CAF50",
                },
                {
                    id: 10,
                    name: "hardware",
                    color: "#9C27B0",
                },
                {
                    id: 11,
                    name: "cloud",
                    color: "#FFC107",
                },
                {
                    id: 12,
                    name: "societal",
                    color: "#FF5722",
                },
                {
                    id: 13,
                    name: "ai",
                    color: "#2196F3",
                },
                {
                    id: 14,
                    name: "blockchain",
                    color: "#009688",
                    icon: <ChatRoundMoneyBoldDuotone />,
                },
                {
                    id: 15,
                    name: "art",
                    color: "#FF9800",
                },
                {
                    id: 16,
                    name: "dev",
                    color: "#795548",
                },
            ],
            setCategories: (categories: Array<Category>) => set({ categories }),
            getCategory: (id?: number) => {
                const category = get().categories.find(
                    (category) => category.id === id
                );
                if (category) return category;
            },
        }),
        {
            name: "category",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
