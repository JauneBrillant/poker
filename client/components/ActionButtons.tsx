// import { SocketEvent } from "@common/types";
// import type { GameState, PlayerAction } from "@common/types";
// import type { ActionEventPayload } from "@common/types";
// import { useSocket } from "@contexts/SocketContext";
// import { useUsername } from "@hooks/useUsername";
// import { useEffect, useRef, useState } from "react";
// import { Animated, Easing, TouchableOpacity } from "react-native";
// import { Button, Text, View, XGroup } from "tamagui";
// import { Color } from "theme/Color";

// interface ActionButtonsProps {
// 	lobbyId: string;
// 	gameState: GameState;
// }

// export const ActionButtons: React.FC<ActionButtonsProps> = ({
// 	lobbyId,
// 	gameState,
// }) => {
// 	const socket = useSocket();
// 	const username = useUsername();
// 	const player = gameState.players.find((p) => p.name === username);
// 	const [betAmount, setBetAmount] = useState<number>(0);
// 	const [raiseAmount, setRaiseAmount] = useState<number>(0);

// 	const [showActions, setShowActions] = useState<boolean>(false);
// 	const [actionAnimations, setActionAnimations] = useState<Animated.Value[]>(
// 		[],
// 	);

// 	useEffect(() => {
// 		if (player?.availableActions) {
// 			setActionAnimations(
// 				player.availableActions.map(() => new Animated.Value(0)),
// 			);
// 		}
// 	}, [player?.availableActions]);

// 	useEffect(() => {
// 		if (player?.isTurn) {
// 			setShowActions(true);
// 			actionAnimations.forEach((anim, index) => {
// 				Animated.timing(anim, {
// 					toValue: 1,
// 					duration: 300,
// 					delay: index * 100,
// 					easing: Easing.out(Easing.ease),
// 					useNativeDriver: true,
// 				}).start();
// 			});
// 		} else {
// 			setShowActions(false);
// 			for (const anim of actionAnimations) {
// 				Animated.timing(anim, {
// 					toValue: 0,
// 					duration: 300,
// 					useNativeDriver: true,
// 				}).start();
// 			}
// 		}
// 	}, [player?.isTurn, actionAnimations]);

// 	const handleActions = (action: PlayerAction) => {
// 		const payload: ActionEventPayload = {
// 			lobbyId,
// 			action,
// 			betAmount,
// 			raiseAmount,
// 		};
// 		socket?.emit(SocketEvent.PLAYER_ACTION, payload);
// 	};

// 	return (
// 		<View
// 			// position="absolute"
// 			// bottom={20}
// 			// right={20}
// 			backgroundColor={Color.green}
// 		>
// 			{showActions &&
// 				player?.availableActions.map((action, index) => (
// 					<Animated.View
// 						key={action}
// 						style={{
// 							transform: [{ scale: actionAnimations[index] }],
// 							marginBottom: 10,
// 						}}
// 					>
// 						<TouchableOpacity
// 							onPress={() => handleActions(action)}
// 							style={{
// 								backgroundColor: "#FF4081",
// 								paddingVertical: 12,
// 								paddingHorizontal: 20,
// 								borderRadius: 30,
// 								shadowColor: "#000",
// 								shadowOffset: { width: 0, height: 3 },
// 								shadowOpacity: 0.3,
// 								shadowRadius: 5,
// 								elevation: 5,
// 							}}
// 						>
// 							<Text
// 								style={{ fontSize: 18, color: "white", fontWeight: "bold" }}
// 							>
// 								{action}
// 							</Text>
// 						</TouchableOpacity>
// 					</Animated.View>
// 				))}
// 		</View>
// 	);
// };

import { SocketEvent } from "@common/types";
import type { GameState, PlayerAction } from "@common/types";
import type { ActionEventPayload } from "@common/types";
import { useSocket } from "@contexts/SocketContext";
import { useUsername } from "@hooks/useUsername";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Text, View } from "tamagui";
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
    <View backgroundColor={Color.green} padding={10} borderRadius={20}>
      {/* {showActions && ( */}
      <View flexDirection="row" flexWrap="wrap" gap={10} justifyContent="center">
        {player?.availableActions.map((action) => (
          <TouchableOpacity
            key={action}
            onPress={() => handleActions(action)}
            style={{
              backgroundColor: "red",
              paddingVertical: 12,
              paddingHorizontal: 20,
              borderRadius: 30, // 丸みを強調して泡っぽく
            }}
          >
            <Text fontSize={18} color="white" fontWeight="bold" fontFamily={Fonts.proxima}>
              {action}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* )} */}
    </View>
  );
};
