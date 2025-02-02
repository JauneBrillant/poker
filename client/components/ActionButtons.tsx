import { SocketEvent } from "@common/types";
import type { GameState, PlayerAction } from "@common/types";
import { useSocket } from "@contexts/SocketContext";
import { useUsername } from "@hooks/useUsername";
import { StyleSheet } from "react-native";
import { Button, YGroup } from "tamagui";

interface ActionButtonsProps {
	lobbyId: string;
	gameState: GameState;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
	lobbyId,
	gameState,
}) => {
	const username = useUsername();
	const player = gameState.players.find((p) => p.name === username);
	const socket = useSocket();

	const handleActions = (action: PlayerAction) => {
		socket?.emit(SocketEvent.PLAYER_ACTION, { lobbyId });
	};

	return (
		<YGroup orientation="horizontal" position="absolute" bottom={10}>
			{player?.availableActions.map((action) => (
				<YGroup.Item key={action}>
					<Button onPress={() => handleActions(action)}>{action}</Button>
				</YGroup.Item>
			))}
		</YGroup>
	);
};
