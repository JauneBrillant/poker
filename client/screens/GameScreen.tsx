import { type GameState, SocketEvent } from "@common/types";
import { ActionButtons, CommunityCards, GameHeader, MyPokerInfo } from "@components";
import { useSocket } from "@contexts/SocketContext";
import { useUsername } from "@hooks/useUsername";
import { useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { Text, XStack, YStack } from "tamagui";
import type { RootStackParamList } from "types/RootStackParamList";
import { Color } from "../theme/Color";

export const GameScreen: React.FC = () => {
  const username = useUsername();
  const socket = useSocket();
  const route = useRoute<RouteProp<RootStackParamList, "Game">>();
  const { lobbyId, initialGameState } = route.params;
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [winnerName, setWinnerName] = useState<string>("");

  useEffect(() => {
    socket?.on(SocketEvent.GAME_WINNER, (winnerName: string) => {
      console.log(winnerName);
      setWinnerName(winnerName);
      setTimeout(() => setWinnerName(""), 3000);
    });

    return () => {
      socket?.off(SocketEvent.GAME_WINNER);
    };
  }, [socket]);

  useEffect(() => {
    socket?.on(SocketEvent.GAME_STATE_UPDATE, (updatedGameState: GameState) => {
      setGameState(updatedGameState);
    });

    return () => {
      socket?.off(SocketEvent.GAME_STATE_UPDATE);
    };
  }, [socket]);

  return (
    <YStack flex={1} justifyContent="space-between" alignItems="center" backgroundColor={Color.offWhite}>
      {winnerName && (
        <YStack position="absolute" top="50%" left="50%" transform={[{ translateX: -50 }, { translateY: -50 }]} backgroundColor={Color.green}>
          <Text>🏆 {winnerName} Wins! 🏆 </Text>
        </YStack>
      )}
      <GameHeader gameState={gameState} />
      <CommunityCards communityCards={gameState.communityCards} />
      <XStack width="100%" justifyContent="space-between">
        <MyPokerInfo gameState={gameState} />
        <ActionButtons gameState={gameState} lobbyId={lobbyId} />
      </XStack>
    </YStack>
  );
};
