import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "@fontsource/ubuntu-mono/index.css";
import "@fontsource/ubuntu/index.css";
import "overlayscrollbars/overlayscrollbars.css";
import "@/styles/main.css";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App />
    </StrictMode>
);
