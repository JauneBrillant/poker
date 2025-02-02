import type { GameState } from "@common/types";
import { ActionButtons, PokerTable } from "@components";
import { useState } from "react";
import { View } from "react-native";

export const GameScreen: React.FC = () => {
	const [gameState, setGameState] = useState<GameState>();

	return (
		<View>
			<PokerTable />
			<ActionButtons />
		</View>
	);
};
