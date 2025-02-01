import type { GameState } from "@common/types";
import { ActionButtons, PokerTable } from "@components";
import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import { View } from "react-native";

export const GameScreen: React.FC = () => {
	const route = useRoute();
	const gameState = route.params;
	// const [gameState, setGameState] = useState<GameState>();

	return (
		<View>
			<PokerTable />
			<ActionButtons />
		</View>
	);
};
