import { SocketEvent } from "@common/types";
import { type GameState, PlayerAction } from "@common/types";
import type { ActionEventPayload } from "@common/types";
import { useSocket } from "@contexts/SocketContext";
import { useUsername } from "@hooks/useUsername";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Text, XStack, YStack } from "tamagui";
import { Color } from "theme/Color";
import { Fonts } from "theme/Fonts";

interface ActionButtonsProps {
  lobbyId: string;
  gameState: GameState;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ lobbyId, gameState }) => {
  const socket = useSocket();
  const username = useUsername();
  const player = gameState.players.find((p) => p.name === username);
  const [betAmount, setBetAmount] = useState<number>(0);
  const [raiseAmount, setRaiseAmount] = useState<number>(0);
  const raiseOptions = [4, 3, 2];
  const betOptions = [1, 2, 3, 4];

  const handleActions = (action: PlayerAction) => {
    if (
      (action === PlayerAction.BET && betAmount === 0) ||
      (action === PlayerAction.RAISE && raiseAmount === 0)
    )
      return;

    const payload: ActionEventPayload = {
      lobbyId,
      action,
      betAmount,
      raiseAmount,
    };
    socket?.emit(SocketEvent.PLAYER_ACTION, payload);
  };

  const handlePressBetAmount = (amount: number) => {
    setBetAmount(Math.floor(gameState.mainPot / amount));
  };

  const handlePressRaiseAmount = (amount: number) => {
    if (player) {
      setRaiseAmount(gameState.maxBetThisRound * amount - player.currentRoundBet);
    }
  };

  return (
    <XStack>
      {/* BET OPTIONS */}
      {player?.isTurn && player?.availableActions.includes(PlayerAction.BET) && (
        <YStack justifyContent="center" gap="$2" marginRight="$3">
          {betOptions.map((value) => (
            <TouchableOpacity
              key={value}
              onPress={() => handlePressBetAmount(value)}
              style={{
                alignItems: "center",
                backgroundColor:
                  betAmount === Math.floor(gameState.mainPot / value) ? Color.pinkk : Color.gray,
                paddingVertical: 12,
                paddingHorizontal: 20,
                borderRadius: 10,
              }}
            >
              <Text fontSize={12} fontWeight="bold" fontFamily={Fonts.proxima}>
                1/{value}
              </Text>
            </TouchableOpacity>
          ))}
        </YStack>
      )}

      {/* RAISE OPTIONS */}
      {player?.isTurn && player?.availableActions.includes(PlayerAction.RAISE) && (
        <YStack justifyContent="center" gap="$2" marginRight="$3">
          {raiseOptions.map((value) => (
            <TouchableOpacity
              key={value}
              onPress={() => handlePressRaiseAmount(value)}
              style={{
                alignItems: "center",
                backgroundColor:
                  raiseAmount === gameState.maxBetThisRound * value - player.currentRoundBet
                    ? Color.pinkk
                    : Color.gray,
                paddingVertical: 12,
                paddingHorizontal: 20,
                borderRadius: 10,
              }}
            >
              <Text fontSize={12} fontWeight="bold" fontFamily={Fonts.proxima}>
                {value}x
              </Text>
            </TouchableOpacity>
          ))}
        </YStack>
      )}

      {/* Available Actions */}
      {player?.isTurn && (
        <YStack justifyContent="center" gap="$2" marginRight="$6">
          {player?.availableActions.map((action) => (
            <TouchableOpacity
              key={action}
              onPress={() => handleActions(action)}
              style={{
                alignItems: "center",
                backgroundColor: Color.green,
                paddingVertical: 12,
                paddingHorizontal: 20,
                borderRadius: 10,
              }}
            >
              <Text fontSize={18} color="white" fontWeight="bold" fontFamily={Fonts.proxima}>
                {action}
              </Text>
            </TouchableOpacity>
          ))}
        </YStack>
      )}
    </XStack>
  );
};
