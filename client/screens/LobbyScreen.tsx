import { SocketEvent } from "@common/types";
import type { LobbyUpdateEventPayload } from "@common/types";
import { useNavigation } from "@react-navigation/native";
import type { NavigationProp } from "@react-navigation/native";
import { useSocket } from "contexts/SocketContext";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { Button, H2, ListItem, View, YGroup } from "tamagui";
import type { RootStackParamList } from "types/RootStackParamList";

export const LobbyScreen: React.FC = () => {
	const socket = useSocket();
	const navigation =
		useNavigation<NavigationProp<RootStackParamList, "Lobby">>();
	const [hostname, setHostName] = useState<string | null>(null);
	const [players, setPlayers] = useState<string[]>([]);

	useEffect(() => {
		const handleLobbyUpdate = ({
			lobbyId,
			updatedPlayers,
		}: LobbyUpdateEventPayload) => {
			setHostName(lobbyId);
			setPlayers(updatedPlayers);
		};

		socket?.on(SocketEvent.LOBBY_UPDATE, handleLobbyUpdate);

		return () => {
			socket?.off(SocketEvent.LOBBY_UPDATE, handleLobbyUpdate);
		};
	}, [socket]);

	const handleClickGameStart = () => {
		if (players.length <= 1) {
			Alert.alert("一人ではゲーム開始できません。");
		} else {
			navigation.navigate("Game");
		}
	};

	return (
		<View flex={1} alignItems="center" marginTop="80">
			<H2
				style={{
					fontFamily: "x10y12pxDonguriDuel",
					fontSize: 30,
					color: "rgb(44, 189, 156)",
				}}
			>
				{hostname}のロビー
			</H2>

			<YGroup>
				{players.map((player, index) => (
					<YGroup.Item key={player}>
						<ListItem>{player}</ListItem>
					</YGroup.Item>
				))}
			</YGroup>

			<Button onPress={handleClickGameStart}>ゲームを開始</Button>
		</View>
	);
};
