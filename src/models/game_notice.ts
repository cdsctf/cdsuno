export interface GameNotice {
    id?: number;
    game_id?: number;
    title?: string;
    content?: string;
    created_at?: number;
}

export interface GetGameNoticeRequest {
    game_id?: number;
}

export interface CreateGameNoticeRequest {
    game_id?: number;
    title?: string;
    content?: string;
}

export interface DeleteGameNoticeRequest {
    id?: number;
    game_id?: number;
}
