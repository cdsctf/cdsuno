import { Response } from "@/types";
import { alova } from "@/utils/alova";

export interface DeleteTeamAvatarRequest {
    game_id: number;
    team_id: number;
}

export function deleteTeamAvatar(request: DeleteTeamAvatarRequest) {
    return alova.Delete<Response<never>>(
        `/games/${request.game_id}/teams/${request.team_id}/avatar`
    );
}
