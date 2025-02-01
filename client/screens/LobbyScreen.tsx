import { SocketEvent } from "@common/types";
import type { LobbyUpdateEventPayload } from "@common/types";
import { useSocket } from "contexts/SocketContext";
import { useEffect, useState } from "react";
import { H2, ListItem, View, YGroup } from "tamagui";

export const LobbyScreen: React.FC = () => {
	const socket = useSocket();
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
		</View>
	);
};
