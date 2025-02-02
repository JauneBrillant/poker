import { type GameState, SocketEvent } from "@common/types";
import { ActionButtons, PokerTable } from "@components";
import { useSocket } from "@contexts/SocketContext";
import { useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View } from "tamagui";
import type { RootStackParamList } from "types/RootStackParamList";

export const GameScreen: React.FC = () => {
	const socket = useSocket();
	const route = useRoute<RouteProp<RootStackParamList, "Game">>();
	const { lobbyId, initialGameState } = route.params;
	const [gameState, setGameState] = useState<GameState>(initialGameState);

	useEffect(() => {
		socket?.on(SocketEvent.GAME_STATE_UPDATE, (updatedGameState: GameState) => {
			setGameState(updatedGameState);
		});
	}, [socket]);

	return (
		<View flex={1} justifyContent="center" alignItems="center">
			<PokerTable gameState={gameState} />
			<ActionButtons lobbyId={lobbyId} gameState={gameState} />
		</View>
	);
};
