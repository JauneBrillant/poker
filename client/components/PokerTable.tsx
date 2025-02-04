import type { GameState } from "@common/types";
import { PlayerInfo } from "@components";
import type React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "tamagui";
import { Color } from "../theme/Color";

interface PokerTableProps {
	gameState: GameState;
}

export const PokerTable: React.FC<PokerTableProps> = ({ gameState }) => {
	const playerLen = gameState.players.length;

	return (
		<View
			position="relative"
			width={260}
			height={460}
			borderRadius={240}
			backgroundColor={Color.green}
		>
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
