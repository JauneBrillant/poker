import type { GameState } from "@common/types";
import { Player } from "@common/types";
import { PlayerInfo } from "@components";
import type React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "tamagui";

// const players: Player[] = [
// 	{ id: 1, name: "1", chips: 1, isActive: true },
// 	{ id: 2, name: "2", chips: 10000, isActive: true },
// 	{ id: 3, name: "3", chips: 5000, isActive: true },
// 	{ id: 4, name: "4", chips: 8000, isActive: false },
// 	{ id: 5, name: "5", chips: 15000, isActive: true },
// 	{ id: 6, name: "6", chips: 9000, isActive: false },
// 	{ id: 7, name: "7", chips: 9000, isActive: false },
// 	{ id: 8, name: "8", chips: 9000, isActive: false },
// ];

interface PokerTableProps {
	gameState: GameState;
}

export const PokerTable: React.FC<PokerTableProps> = ({ gameState }) => {
	const playerLen = gameState.players.length;

	return (
		<View style={styles.table}>
			<Text position="absolute" left={70} top={200}>
				currentplayer: {gameState.players[gameState.currentPlayerIndex].name}
			</Text>
			<Text position="absolute" left={110} top={220}>
				pot: {gameState.mainPot}
			</Text>
			{gameState.players.map((player, index) => {
				return (
					<PlayerInfo
						key={player.name}
						index={index}
						player={player}
						playersLen={playerLen}
					/>
				);
			})}
		</View>
	);
};

const styles = StyleSheet.create({
	table: {
		backgroundColor: "#006400",
		position: "relative",
		width: 270,
		height: 480,
		borderRadius: 240,
		borderWidth: 4,
		borderColor: "#ccc",
	},
});
