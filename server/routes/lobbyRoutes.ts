import type { CreateLobbyRequest, FindLobbyRequest } from "@common/types";
import { LobbyManager } from "@services/LobbyManager";
import { Router } from "express";
import type { Request, Response } from "express";

const router: Router = Router();

router.post(
  "/create-lobby",
  (
    req: Request<unknown, unknown, CreateLobbyRequest>,
    res: Response<{ message: string }>,
  ): void => {
    try {
      const lobby = LobbyManager.getInstance();
      const { hostname } = req.body;
      lobby.createLobby(hostname);
      res.sendStatus(201);
    } catch (error) {
      console.error("Error in create-lobby route:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
);

router.get(
  "/check-lobby/:lobbyId",
  (req: Request<FindLobbyRequest>, res: Response<{ message: string }>): void => {
    try {
      const { lobbyId } = req.params;
      const decodedLobbyId = decodeURIComponent(lobbyId);

      const lobby = LobbyManager.getInstance();
      if (lobby.existLobby(decodedLobbyId)) {
        res.sendStatus(200);
      } else {
        res.status(404).json({ message: `Lobby: ${decodedLobbyId} does not exist` });
      }
    } catch (error) {
      console.error("Error in check-lobby route:", error);
      res.status(400).json({ message: "Invalid lobby ID format" });
    }
  },
);

export default router;
