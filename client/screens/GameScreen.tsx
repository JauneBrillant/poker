import { type GameState, SocketEvent } from "@common/types";
import { CommunityCards, GameHeader, MyPokerInfo, Pod } from "@components";
import { useSocket } from "@contexts/SocketContext";
import { useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import { Opponents } from "components/Opponents";
import { useEffect, useState } from "react";
import { Text, YStack } from "tamagui";
import type { RootStackParamList } from "types/RootStackParamList";
import { Color } from "../theme/Color";

export const GameScreen: React.FC = () => {
  const socket = useSocket();
  const route = useRoute<RouteProp<RootStackParamList, "Game">>();
  const { lobbyName, initialGameState } = route.params;
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [winnerName, setWinnerName] = useState<string>("");

  useEffect(() => {
    socket?.on(SocketEvent.GAME_WINNER, (winnerName: string) => {
      setWinnerName(winnerName);
      setTimeout(() => setWinnerName(""), 3000);
    });

    return () => {
      socket?.off(SocketEvent.GAME_WINNER);
    };
  }, [socket]);

  useEffect(() => {
    if (!socket) return;

    const onGameStateUpdate = (updateGameState: GameState) => {
      setGameState(updateGameState);
    };

    socket.off(SocketEvent.GAME_STATE_UPDATE, onGameStateUpdate);
    socket.on(SocketEvent.GAME_STATE_UPDATE, onGameStateUpdate);

    return () => {
      socket.off(SocketEvent.GAME_STATE_UPDATE, onGameStateUpdate);
    };
  }, [socket]);

  return (
    <YStack
      flex={1}
      justifyContent="space-between"
      alignItems="center"
      backgroundColor={Color.offWhite}
    >
      {winnerName && (
        <YStack
          position="absolute"
          top="50%"
          left="50%"
          transform={[{ translateX: -50 }, { translateY: -50 }]}
          backgroundColor={Color.green}
        >
          <Text>🏆 {winnerName} Wins! 🏆 </Text>
        </YStack>
      )}
      <GameHeader gameState={gameState} />
      <Opponents players={gameState.players} />
      <Pod podAmount={gameState.mainPot} />
      <CommunityCards communityCards={gameState.communityCards} />
      <MyPokerInfo gameState={gameState} lobbyId={lobbyName} />
    </YStack>
  );
};
