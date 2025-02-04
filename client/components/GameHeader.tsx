import type { GameState } from "@common/types";
import { useNavigation } from "@react-navigation/native";
import type { NavigationProp } from "@react-navigation/native";
import { SquareChevronLeft } from "@tamagui/lucide-icons";
import { Alert } from "react-native";
import { Button, Text, XStack, YStack } from "tamagui";
import type { RootStackParamList } from "types/RootStackParamList";

interface GameHeaderProp {
	gameState: GameState;
}

export const GameHeader: React.FC<GameHeaderProp> = ({ gameState }) => {
	const navigation =
		useNavigation<NavigationProp<RootStackParamList, "Game">>();

	const handleClickArrowBtn = () => {
		Alert.alert("確認", "ゲームから抜けますか？", [
			{ text: "キャンセル", style: "cancel" },
			{ text: "OK", onPress: () => navigation.navigate("Home") },
		]);
	};

	return (
		<XStack
			top="$8"
			width="94%"
			alignItems="center"
			justifyContent="space-between"
		>
			<Button
				unstyled
				icon={SquareChevronLeft}
				size={70}
				justifyContent="center"
				onPress={handleClickArrowBtn}
			/>
			<YStack>
				<Text>ラウンド : {gameState.currentRound}</Text>
				<Text>
					ターン 　: {gameState.players[gameState.currentPlayerIndex].name}
				</Text>
			</YStack>
		</XStack>
	);
};
