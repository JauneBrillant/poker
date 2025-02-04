import { SocketEvent } from "@common/types";
import type { LobbyUpdateEventPayload } from "@common/types";
import type { GameStartedEventPayload } from "@common/types";
import { useUsername } from "@hooks/useUsername";
import { useNavigation } from "@react-navigation/native";
import type { NavigationProp } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import { useSocket } from "contexts/SocketContext";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { Button, H2, ListItem, View, YGroup, YStack } from "tamagui";
import type { RootStackParamList } from "types/RootStackParamList";
import { Color } from "../theme/Color";

export const LobbyScreen: React.FC = () => {
	const route = useRoute<RouteProp<RootStackParamList, "Lobby">>();
	const { lobbyId } = route.params;
	const socket = useSocket();
	const navigation =
		useNavigation<NavigationProp<RootStackParamList, "Lobby">>();
	const username = useUsername();
	const [players, setPlayers] = useState<string[]>([]);

	useEffect(() => {
		const handleLobbyUpdate = ({ updatedPlayers }: LobbyUpdateEventPayload) => {
			setPlayers(updatedPlayers);
		};

		socket?.on(
			SocketEvent.GAME_STARTED,
			({ initialGameState }: GameStartedEventPayload) => {
				navigation.navigate("Game", { lobbyId, initialGameState });
			},
		);
		socket?.on(SocketEvent.LOBBY_UPDATE, handleLobbyUpdate);

		return () => {
			socket?.off(SocketEvent.LOBBY_UPDATE, handleLobbyUpdate);
			// socket?.off(SocketEvent.GAME_STARTED);
		};
	}, [socket, navigation, lobbyId]);

	const handleClickGameStart = () => {
		if (players.length <= 1) {
			Alert.alert("一人ではゲーム開始できません。");
			return;
		}

		if (lobbyId !== username) {
			Alert.alert("ホスト以外ゲームを開始できません。");
			return;
		}

		socket?.emit(SocketEvent.GAME_START, { lobbyId, players });
	};

	return (
		<YStack flex={1} backgroundColor={Color.offWhite} alignItems="center">
			<H2
				fontSize="$9"
				color={Color.green}
				marginTop={10}
				marginBottom={10}
				style={{
					fontFamily: "x10y12pxDonguriDuel",
				}}
			>
				{lobbyId}のロビー
			</H2>

			<YGroup marginTop="$10">
				{players.map((player, index) => (
					<YGroup.Item key={player}>
						<ListItem>{player}</ListItem>
					</YGroup.Item>
				))}
			</YGroup>

			<Button onPress={handleClickGameStart}>ゲームを開始</Button>
		</YStack>
	);
};
