import {
    Game,
    CreateGameRequest,
    DeleteGameRequest,
    GetGameRequest,
    GetGameScoreboardRequest,
    UpdateGameRequest,
    ScoreRecord,
} from "@/models/game";
import {
    GameChallenge,
    GetGameChallengeRequest,
    CreateGameChallengeRequest,
    DeleteGameChallengeRequest,
    UpdateGameChallengeRequest,
} from "@/models/game_challenge";
import {
    CreateGameNoticeRequest,
    DeleteGameNoticeRequest,
    GameNotice,
    GetGameNoticeRequest,
} from "@/models/game_notice";
import {
    GameTeam,
    CreateGameTeamRequest,
    DeleteGameTeamRequest,
    GetGameTeamRequest,
    UpdateGameTeamRequest,
} from "@/models/game_team";
import { Metadata } from "@/models/media";
import { Submission } from "@/models/submission";
import { Response } from "@/types";
import { alova } from "@/utils/alova";

export async function getGames(request: GetGameRequest) {
    return alova.Get<Response<Array<Game>>>("/games", {
        params: request,
    });
}

export async function createGame(request: CreateGameRequest) {
    return alova.Post<Response<Game>>("/games", request);
}

export async function updateGame(request: UpdateGameRequest) {
    return alova.Put<Response<Game>>(`/games/${request.id}`, request);
}

export async function getScoreboard(
    id: number,
    request: GetGameScoreboardRequest
) {
    return alova.Get<Response<Array<ScoreRecord>>>(`/games/${id}/scoreboard`, {
        params: request,
    });
}

export async function deleteGame(request: DeleteGameRequest) {
    return alova.Delete<Response<never>>(`/games/${request.id}`);
}

export async function getGamePosterMetadata(id: number) {
    return alova.Get<Response<Metadata>>(`/games/${id}/poster/metadata`);
}

export async function deleteGamePoster(id: number) {
    return alova.Delete<Response<never>>(`/games/${id}/poster`);
}

export async function getGameIconMetadata(id: number) {
    return alova.Get<Response<Metadata>>(`/games/${id}/icon/metadata`);
}

export async function deleteGameIcon(id: number) {
    return alova.Delete<Response<never>>(`/games/${id}/icon`);
}

export async function getGameChallenges(request: GetGameChallengeRequest) {
    return alova.Get<Response<Array<GameChallenge>>>(
        `/games/${request.game_id}/challenges`,
        {
            params: request,
        }
    );
}

export async function createGameChallenge(request: CreateGameChallengeRequest) {
    return alova.Post<Response<GameChallenge>>(
        `/games/${request.game_id}/challenges`,
        request
    );
}

export async function updateGameChallenge(request: UpdateGameChallengeRequest) {
    return alova.Put<Response<GameChallenge>>(
        `/games/${request.game_id}/challenges/${request.challenge_id}`,
        request
    );
}

export async function deleteGameChallenge(request: DeleteGameChallengeRequest) {
    return alova.Delete<Response<never>>(
        `/games/${request.game_id}/challenges/${request.challenge_id}`,
        request
    );
}

export async function getGameTeams(request: GetGameTeamRequest) {
    return alova.Get<Response<Array<GameTeam>>>(
        `/games/${request.game_id}/teams`,
        {
            params: request,
        }
    );
}

export async function createGameTeam(request: CreateGameTeamRequest) {
    return alova.Post<Response<GameTeam>>(
        `/games/${request.game_id}/teams`,
        request
    );
}

export async function updateGameTeam(request: UpdateGameTeamRequest) {
    return alova.Put<Response<GameTeam>>(
        `/games/${request.game_id}/teams/${request.team_id}`,
        request
    );
}

export async function deleteGameTeam(request: DeleteGameTeamRequest) {
    return alova.Delete<Response<never>>(
        `/games/${request.game_id}/challenges/${request.team_id}`,
        request
    );
}

export async function getGameNotice(request: GetGameNoticeRequest) {
    return alova.Get<Response<Array<GameNotice>>>(
        `/games/${request.game_id}/notices`,
        {
            params: request,
        }
    );
}

export async function createGameNotice(request: CreateGameNoticeRequest) {
    return alova.Post<Response<GameNotice>>(
        `/games/${request.game_id}/notices`,
        request
    );
}

export async function deleteGameNotice(request: DeleteGameNoticeRequest) {
    return alova.Delete<Response<never>>(
        `/games/${request.game_id}/notices/${request.id}`,
        request
    );
}

export async function getGameScoreboard(request: GetGameScoreboardRequest) {
    return alova.Get<
        Response<
            Array<{
                game_team?: GameTeam;
                submissions?: Array<Submission>;
            }>
        >
    >(`/games/${request.id}/scoreboard`, {
        params: request,
    });
}
