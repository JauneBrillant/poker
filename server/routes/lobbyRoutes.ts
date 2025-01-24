import express, { Request, Response, Router } from "express";
import { nanoid } from "nanoid";
import { CreateLobbyRequest, CreateLobbyResponse } from "@common/types";

const router: Router = express.Router();

router.post(
  "/lobby",
  async (
    req: Request<CreateLobbyRequest>,
    res: Response<CreateLobbyResponse>
  ): Promise<any> => {
    try {
      const lobbyId = nanoid();
      const response: CreateLobbyResponse = {
        success: true,
        data: {
          lobbyId,
        },
      };
      return res.status(201).json(response);
    } catch (error) {
      console.error("Error creating lobby:", error);

      const errorResponse: CreateLobbyResponse = {
        success: false,
        error: {
          code: 500,
          message: "Failed to create lobby",
        },
      };
      return res.status(500).json(errorResponse);
    }
  }
);

export default router;
