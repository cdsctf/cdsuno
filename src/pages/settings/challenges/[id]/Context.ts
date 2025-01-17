import { Challenge } from "@/models/challenge";
import React from "react";

interface ContextProps {
    challenge?: Challenge;
    setRefresh?: () => void;
    updateChallenge?: (challenge: Challenge) => void;
}

const Context = React.createContext<ContextProps>({});

export default Context;
