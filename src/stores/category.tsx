import { Category } from "@/models/category";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import StarFallBoldDuotone from "~icons/solar/star-fall-bold-duotone";
import ChatRoundMoneyBoldDuotone from "~icons/solar/chat-round-money-bold-duotone";
import Planet2BoldDuotone from "~icons/solar/planet-2-bold-duotone";
import RewindBackBoldDuotone from "~icons/solar/rewind-back-bold-duotone";
import HashtagBoldDuotone from "~icons/solar/hashtag-bold-duotone";
import CodeBoldDuotone from "~icons/solar/code-bold-duotone";
import GalleryBoldDuotone from "~icons/solar/gallery-bold-duotone";
import GalleryEditBoldDuotone from "~icons/solar/gallery-edit-bold-duotone";
import ChatSquareCodeBoldDuotone from "~icons/solar/chat-square-code-bold-duotone";
import CardSearchBoldDuotone from "~icons/solar/card-search-bold-duotone";
import CloudBoldDuotone from "~icons/solar/cloud-bold-duotone";
import CpuBoldDuotone from "~icons/solar/cpu-bold-duotone";
import ProgammingBoldDuotone from "~icons/solar/programming-bold-duotone";
import SmartphoneBoldDuotone from "~icons/solar/smartphone-bold-duotone";
import BlackHoleLineDuotone from "~icons/solar/black-hole-line-duotone";
import MinimalisticMagniferBoldDuotone from "~icons/solar/minimalistic-magnifer-bold-duotone";
import DatabaseBoldDuotone from "~icons/solar/database-bold-duotone";

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
                    color: "#E64A19",
                    icon: <RewindBackBoldDuotone />,
                },
                {
                    id: 4,
                    name: "crypto",
                    color: "#607D8B",
                    icon: <HashtagBoldDuotone />,
                },
                {
                    id: 5,
                    name: "forensics",
                    color: "#9C27B0",
                    icon: <MinimalisticMagniferBoldDuotone />,
                },
                {
                    id: 6,
                    name: "mobile",
                    color: "#1976D2",
                    icon: <SmartphoneBoldDuotone />,
                },
                {
                    id: 7,
                    name: "pwn",
                    color: "#D32F2F",
                    icon: <ProgammingBoldDuotone />,
                },
                {
                    id: 8,
                    name: "steg",
                    color: "#795548",
                    icon: <BlackHoleLineDuotone />,
                },
                {
                    id: 9,
                    name: "osint",
                    color: "#4CAF50",
                    icon: <GalleryBoldDuotone />,
                },
                {
                    id: 10,
                    name: "hardware",
                    color: "#673AB7",
                    icon: <CpuBoldDuotone />,
                },
                {
                    id: 11,
                    name: "cloud",
                    color: "#FF9800",
                    icon: <CloudBoldDuotone />,
                },
                {
                    id: 12,
                    name: "societal",
                    color: "#BF360C",
                    icon: <CardSearchBoldDuotone />,
                },
                {
                    id: 13,
                    name: "ai",
                    color: "#1565C0",
                    icon: <ChatSquareCodeBoldDuotone />,
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
                    color: "#F57F17",
                    icon: <GalleryEditBoldDuotone />,
                },
                {
                    id: 16,
                    name: "dev",
                    color: "#37474F",
                    icon: <CodeBoldDuotone />,
                },
                {
                    id: 17,
                    name: "ds",
                    color: "#0D47A1",
                    icon: <DatabaseBoldDuotone />,
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
