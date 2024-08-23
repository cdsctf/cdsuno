import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/styles/main.scss";
import "@unocss/reset/tailwind.css";
import "virtual:uno.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App />
    </StrictMode>
);
