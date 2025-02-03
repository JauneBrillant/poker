import type { Player } from "@common/types";
import { StyleSheet } from "react-native";
import { Card, Text } from "tamagui";

interface PlayerInfoProps {
	index: number;
	player: Player;
	playersLen: number;
}

export const PlayerInfo: React.FC<PlayerInfoProps> = ({
	index,
	player,
	playersLen,
}) => {
	const position = positionsByPlayerCount[playersLen]?.[index];
	return (
		<Card
			style={[
				styles.playerCard,
				{ backgroundColor: player.isActive ? "#4CAF50" : "#D3D3D3" },
				{ left: position.x, top: position.y },
			]}
		>
			<Text fontFamily={"x10y12pxDonguriDuel"}>
				{player.name}({player.position})
			</Text>
			<Text fontFamily={"x10y12pxDonguriDuel"}>{player.chips}</Text>
		</Card>
	);
};

const styles = StyleSheet.create({
	playerCard: {
		position: "absolute",
		width: 80,
		height: 80,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 10,
	},
});

const positionsByPlayerCount: { [key: number]: { x: number; y: number }[] } = {
	2: [
		{ x: 100, y: 450 },
		{ x: 100, y: -50 },
	],
	3: [
		{ x: 100, y: 450 },
		{ x: -50, y: 150 },
		{ x: 230, y: 150 },
	],
	4: [
		{ x: 100, y: 450 },
		{ x: -50, y: 180 },
		{ x: 100, y: -50 },
		{ x: 230, y: 180 },
	],
	5: [
		{ x: 100, y: 450 },
		{ x: -50, y: 280 },
		{ x: -50, y: 100 },
		{ x: 230, y: 100 },
		{ x: 230, y: 280 },
	],
	6: [
		{ x: 100, y: 450 },
		{ x: -50, y: 280 },
		{ x: -50, y: 100 },
		{ x: 100, y: -50 },
		{ x: 230, y: 100 },
		{ x: 230, y: 280 },
	],
	7: [
		{ x: 100, y: 450 },
		{ x: -50, y: 320 },
		{ x: -50, y: 180 },
		{ x: -50, y: 40 },
		{ x: 230, y: 40 },
		{ x: 230, y: 180 },
		{ x: 230, y: 320 },
	],
	8: [
		{ x: 100, y: 450 },
		{ x: -50, y: 320 },
		{ x: -50, y: 180 },
		{ x: -50, y: 40 },
		{ x: 230, y: 40 },
		{ x: 230, y: 180 },
		{ x: 230, y: 320 },
		{ x: 100, y: -50 },
	],
};
