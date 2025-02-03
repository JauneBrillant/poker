import type { CreateLobbyRequest } from "@common/types";
import { Platform } from "react-native";

const BASE_URL = "http://192.168.1.6:3000";
const LOCAL_URL = "http://localhost:3000";
const ANDROID_EMU_URL = "http://10.0.2.2:3000";
const SERVER_URL = Platform.OS === "ios" ? LOCAL_URL : ANDROID_EMU_URL;

export const createLobby = async (hostname: string): Promise<void> => {
	const reqData: CreateLobbyRequest = {
		hostname,
	};

	const res = await fetch(`${BASE_URL}/api/create-lobby`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(reqData),
	});

	if (!res.ok) {
		const { message } = await res.json();
		throw new Error(message || "Failed to create lobby");
	}
};

export const findLobby = async (lobbyId: string): Promise<void> => {
	const encodedLobbyId = encodeURIComponent(lobbyId);
	const res = await fetch(`${BASE_URL}/api/check-lobby/${encodedLobbyId}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!res.ok) {
		const { message } = await res.json();
		throw new Error(message || "Failed to find lobby");
	}
};
