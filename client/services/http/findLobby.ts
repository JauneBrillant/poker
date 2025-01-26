import {
  ApiResponse,
  FindLobbyRequest,
  FindLobbyResponse,
} from "@common/types";

const BASE_URL = "http://localhost:3000";
const EMU_URL = "http://10.0.2.2:3000";

export const findLobby = async (
  request: FindLobbyRequest
): Promise<boolean> => {
  try {
    const response = await fetch(`${EMU_URL}/api/findLobby`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create lobby");
    }

    return true;
  } catch (error) {
    console.log("Error creating lobby: ", error);
    throw error;
  }
};
