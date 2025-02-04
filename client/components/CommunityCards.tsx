import { type Card, type GameState, Round } from "@common/types";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { Animated, Easing } from "react-native";
import { Image, Text, View, XGroup, XStack } from "tamagui";
import { getCardImagePath } from "utils/getCardImagePath";

interface Props {
  communityCards: Card[];
}

export const CommunityCards: React.FC<Props> = ({ communityCards }) => {
  const [cardPositions, setCardPositions] = useState<Animated.ValueXY[]>([]);

  useEffect(() => {
    if (cardPositions.length < communityCards.length) {
      setCardPositions((prev) => [...prev, new Animated.ValueXY({ x: -200, y: -200 })]);
    }
  }, [communityCards.length, cardPositions]);

  useEffect(() => {
    communityCards.forEach((_, index) => {
      if (cardPositions[index]) {
        Animated.timing(cardPositions[index], {
          toValue: { x: 0 + index * 70, y: 0 },
          duration: 1000 + index * 300,
          easing: Easing.out(Easing.ease),
          useNativeDriver: false,
        }).start();
      }
    });
  }, [communityCards, cardPositions]);

  return (
    <View flex={1} justifyContent="center" alignItems="center" position="relative">
      {communityCards.map((card, index) => (
        <Animated.View
          key={card.suit + card.rank}
          style={{
            position: "absolute",
            transform: cardPositions[index]?.getTranslateTransform() || [],
          }}
        >
          <Image source={getCardImagePath(card)} width={60} height={90} />
        </Animated.View>
      ))}
    </View>
  );
};
