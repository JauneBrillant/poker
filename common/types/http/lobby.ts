import { ApiResponse } from "@common/types";

export interface CreateLobbyRequest {
  hostName: string;
}

export interface FindLobbyRequest {
  lobbyId: string;
}

export interface LobbyData {
  lobbyId: string;
}

export type CreateLobbyResponse = ApiResponse<LobbyData>;
export type FindLobbyResponse = ApiResponse<boolean>;
