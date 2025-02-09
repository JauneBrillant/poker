import { SocketEvent } from "@common/types";
import { type GameState, PlayerAction } from "@common/types";
import type { ActionEventPayload } from "@common/types";
import { useSocket } from "@contexts/SocketContext";
import { useUsername } from "@hooks/useUsername";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { ListItem, Text, View, XStack, YGroup, YStack } from "tamagui";
import { Color } from "theme/Color";
import { Fonts } from "theme/fonts";

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
  const [showActions, setShowActions] = useState<boolean>(false);
  const raiseOptions = [4, 3, 2];
  const betOptions = [1, 2, 3, 4];

  useEffect(() => {
    setShowActions(player?.isTurn ?? false);
  }, [player?.isTurn]);

  const handleActions = (action: PlayerAction) => {
    const payload: ActionEventPayload = {
      lobbyId,
      action,
      betAmount,
      raiseAmount,
    };
    socket?.emit(SocketEvent.PLAYER_ACTION, payload);
  };

  return (
    <XStack>
      {/* BET OPTIONS */}
      {player?.isTurn && player?.availableActions.includes(PlayerAction.BET) && (
        <YStack justifyContent="center" gap="$2" marginRight="$3">
          {betOptions.map((value) => (
            <TouchableOpacity
              key={value}
              onPress={() => setBetAmount(value)}
              style={{
                alignItems: "center",
                backgroundColor: betAmount === value ? Color.pinkk : Color.gray,
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
              onPress={() => setRaiseAmount(value)}
              style={{
                alignItems: "center",
                backgroundColor: raiseAmount === value ? Color.green : Color.gray,
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
