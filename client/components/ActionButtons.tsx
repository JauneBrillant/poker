import { SocketEvent } from "@common/types";
import type { GameState, PlayerAction } from "@common/types";
import type { ActionEventPayload } from "@common/types";
import { useSocket } from "@contexts/SocketContext";
import { useUsername } from "@hooks/useUsername";
import { useState } from "react";
import { Button, Text, XGroup } from "tamagui";

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
	const [betAmount, setBetAmount] = useState<number>(0);
	const [raiseAmount, setRaiseAmount] = useState<number>(0);

	const handleActions = (action: PlayerAction) => {
		const payload: ActionEventPayload = {
			lobbyId,
			action,
			betAmount,
			raiseAmount,
		};
		socket?.emit(SocketEvent.PLAYER_ACTION, payload);
	};

	return (
		<XGroup bottom={20}>
			{player?.availableActions.map((action) => (
				<XGroup.Item key={action}>
					<Button onPress={() => handleActions(action)}>
						<Text fontSize={20} fontFamily={"x10y12pxDonguriDuel"}>
							{action}
						</Text>
					</Button>
				</XGroup.Item>
			))}
		</XGroup>
	);
};
