import type { GameState, Player } from "@common/types";
import { useUsername } from "@hooks/useUsername";
import { useEffect, useState } from "react";
import { Circle, Image, Text, View, XGroup, XStack, YStack } from "tamagui";
import { Color } from "theme/Color";
import { Fonts } from "theme/fonts";
import { getCardImagePath } from "utils/getCardImagePath";
import { ActionButtons } from "./ActionButtons";

interface props {
  gameState: GameState;
  lobbyId: string;
}

export const MyPokerInfo: React.FC<props> = ({ gameState, lobbyId }) => {
  const myName = useUsername();
  const player = gameState.players.find((p) => p.name === myName);

  // <View
  //   position="absolute"
  //   bottom={-40}
  //   left="50%"
  //   style={{ transform: [{ translateX: -15 }] }}
  // >
  //   <Circle
  //     size={30}
  //     backgroundColor={Color.offGreen}
  //     justifyContent="center"
  //     alignItems="center"
  //   >
  //     <Text fontWeight="bold" fontSize={12}>
  //       {p.currentRoundBet}
  //     </Text>
  //   </Circle>
  // </View>

  return (
    <View>
      <XStack width="100%" justifyContent="center" marginBottom={10}>
        <Circle
          size={30}
          backgroundColor={Color.offGreen}
          justifyContent="center"
          alignItems="center"
        >
          <Text fontWeight="bold" fontSize={12}>
            {player?.currentRoundBet}
          </Text>
        </Circle>
      </XStack>

      <XStack width="100%" justifyContent="space-between">
        <YStack width="45%">
          <Text textAlign="center" fontSize="$4" fontFamily={Fonts.proxima} marginTop={10}>
            Chips: {player?.chips}
          </Text>
          <XGroup alignSelf="center" marginTop={30}>
            {player?.hand.cards.map((card) => (
              <Image
                key={card.suit + card.rank}
                source={getCardImagePath(card)}
                width={60}
                height={90}
              />
            ))}
          </XGroup>
          <Text
            textAlign="center"
            fontSize="$4"
            fontFamily={Fonts.proxima}
            marginTop={10}
            marginBottom={20}
          >
            {player?.hand.strRank}
          </Text>
        </YStack>
        <ActionButtons gameState={gameState} lobbyId={lobbyId} />
      </XStack>
    </View>
  );
};
