import { type GameState, SocketEvent } from "@common/types";
import { ActionButtons, CommunityCards, GameHeader, MyPokerInfo } from "@components";
import { useSocket } from "@contexts/SocketContext";
import { useUsername } from "@hooks/useUsername";
import { useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { XStack, YStack } from "tamagui";
import type { RootStackParamList } from "types/RootStackParamList";
import { Color } from "../theme/Color";

export const GameScreen: React.FC = () => {
  const username = useUsername();
  const socket = useSocket();
  const route = useRoute<RouteProp<RootStackParamList, "Game">>();
  const { lobbyId, initialGameState } = route.params;
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  useEffect(() => {
    socket?.on(SocketEvent.GAME_STATE_UPDATE, (updatedGameState: GameState) => {
      setGameState(updatedGameState);
    });
  }, [socket]);

  return (
    <YStack flex={1} justifyContent="space-between" alignItems="center" backgroundColor={Color.offWhite}>
      <GameHeader gameState={gameState} />
      <CommunityCards communityCards={gameState.communityCards} />
      <XStack width="95%" height={300} justifyContent="space-between">
        <MyPokerInfo gameState={gameState} />
        <ActionButtons gameState={gameState} lobbyId={lobbyId} />
      </XStack>
    </YStack>

    // <XStack>
    // 	<MyPokerInfo gameState={gameState} />
    // 	<ActionButtons gameState={gameState} lobbyId={lobbyId} />
    // </XStack>
  );
};
