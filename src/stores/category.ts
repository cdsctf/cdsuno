import { Category } from "@/models/category";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

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
                },
                {
                    id: 2,
                    name: "web",
                    color: "#009688",
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
