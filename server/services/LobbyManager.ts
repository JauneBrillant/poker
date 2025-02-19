import Redis from "ioredis";

const redisUrl = "redis://localhost:6379";
const redis = new Redis(redisUrl);

export class LobbyManager {
  public async createLobby(lobbyName: string): Promise<void> {
    try {
      await redis.hset(lobbyName, "players", JSON.stringify([lobbyName]));
    } catch (error) {
      const msg = "error occurred during createLobby Redis operation";
      console.error(msg, error);
      throw new Error(msg);
    }
  }

  public async joinLobby(lobbyName: string, username: string): Promise<string[] | null> {
    try {
      const lobbyMembers = JSON.parse(await redis.hget(lobbyName, "players"));
      if (!lobbyMembers) return null;
      lobbyMembers.push(username);
      await redis.hset(`lobby:${lobbyName}`, "players", JSON.stringify(lobbyMembers));
      return lobbyMembers;
    } catch (error) {
      const msg = "error occurred during joinLobby Redis operation";
      console.error(msg, error);
      throw new Error(msg);
    }
  }

  public async leaveLobby(lobbyName: string, userName: string): Promise<string[]> {
    try {
      const lobbyMembers = JSON.parse(await redis.hget(lobbyName, "players"));
      if (!lobbyMembers) return;
      const index = lobbyMembers.indexOf(userName);
      if (index !== -1) {
        lobbyMembers.splice(index, 1);
        await redis.hset(lobbyName, "players", JSON.stringify(lobbyMembers));
      }
      return lobbyMembers;
    } catch (error) {
      const msg = "error occurred during leaveLobby Redis operation";
      console.error(msg, error);
      throw new Error(msg);
    }
  }

  public async deleteLobby(lobbyName: string): Promise<void> {
    await redis.del("lobbyName");
  }

  public async existLobby(lobbyId: string): Promise<boolean> {
    const data = await redis.hget(`lobby:${lobbyId}`, "players");
    return !!data;
  }
}
