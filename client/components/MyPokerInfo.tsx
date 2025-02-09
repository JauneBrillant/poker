import type { GameState, Player } from "@common/types";
import { useUsername } from "@hooks/useUsername";
import { useEffect, useState } from "react";
import { Image, Text, View, XGroup, XStack, YStack } from "tamagui";
import { Color } from "theme/Color";
import { Fonts } from "theme/fonts";
import { getCardImagePath } from "utils/getCardImagePath";

interface props {
  gameState: GameState;
}

export const MyPokerInfo: React.FC<props> = ({ gameState }) => {
  const myName = useUsername();
  const player = gameState.players.find((p) => p.name === myName);

  return (
    <YStack width="45%">
      <Text textAlign="center" fontSize="$4" fontFamily={Fonts.proxima} marginTop={10}>
        Bet: {player?.currentRoundBet}
      </Text>
      <Text textAlign="center" fontSize="$4" fontFamily={Fonts.proxima} marginTop={10}>
        Chips: {player?.chips}
      </Text>
      <XGroup alignSelf="center" marginTop={30}>
        {player?.hand.cards.map((card) => (
          <Image key={card.suit + card.rank} source={getCardImagePath(card)} width={60} height={90} />
        ))}
      </XGroup>
      <Text textAlign="center" fontSize="$4" fontFamily={Fonts.proxima} marginTop={10} marginBottom={20}>
        {player?.hand.strRank}
      </Text>
    </YStack>
  );
};
