import type { Lobby } from "@common/types";

// singleton
export class LobbyManager {
  private static instance: LobbyManager;
  private lobbies: Map<string, Lobby> = new Map();

  private constructor() {}
  public static getInstance(): LobbyManager {
    if (!LobbyManager.instance) {
      LobbyManager.instance = new LobbyManager();
    }
    return LobbyManager.instance;
  }

  public createLobby(lobbyId: string): void {
    this.lobbies.set(lobbyId, { id: lobbyId, players: [] });
  }

  public getLobby(lobbyId: string): Lobby {
    return this.lobbies.get(lobbyId) ?? null;
  }

  public joinLobby(lobbyId: string, attendee: string): boolean {
    const lobby = this.lobbies.get(lobbyId);
    if (!lobby) return false;
    lobby.players.push(attendee);
    return true;
  }

  public existLobby(lobbyId: string): boolean {
    return this.lobbies.has(lobbyId);
  }

  public deleteLobby(lobbyId: string): boolean {
    return this.lobbies.delete(lobbyId);
  }
}
