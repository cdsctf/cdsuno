import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "virtual:uno.css";
import "@unocss/reset/tailwind.css";
import "@/styles/main.scss";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App />
    </StrictMode>
);
