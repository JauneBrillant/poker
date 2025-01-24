import { ApiResponse } from "@common/types";

export interface CreateLobbyRequest {
  createrId: string;
  isPrivate: boolean;
  password?: string;
}

export interface LobbyData {
  lobbyId: string;
}

export type CreateLobbyResponse = ApiResponse<LobbyData>;
