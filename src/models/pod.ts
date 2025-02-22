export interface Pod {
    id: string;
    game_id: number;
    // game: Game;
    user_id: number;
    // user: User;
    team_id: number;
    // team: Team;
    challenge_id: string;
    // challenge: Challenge;
    nats?: string;
    ports?: Array<number>;
    public_entry?: string;

    status?: string;
    reason?: string;

    renew?: number;
    duration?: number;
    started_at?: number;
}

export interface GetPodRequest {
    id?: string;
    game_id?: number;
    user_id?: number;
    team_id?: number;
    challenge_id?: string;
}

export interface CreatePodRequest {
    game_id?: number;
    team_id?: number;
    challenge_id?: string;
}

export interface RemovePodRequest {
    id: string;
}

export interface RenewPodRequest {
    id: string;
    team_id?: number;
    game_id?: number;
}
