import type { Card } from "@common/types";
import type React from "react";
import { useEffect, useState } from "react";
import { Animated, Easing } from "react-native";
import { Image, View, useWindowDimensions } from "tamagui";
import { getCardImagePath } from "utils/getCardImagePath";

interface Props {
  communityCards: Card[];
}

export const CommunityCards: React.FC<Props> = ({ communityCards }) => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const [cardPositions, setCardPositions] = useState<Animated.ValueXY[]>([]);

  const CARD_WIDTH = 60;
  const CARD_HEIGHT = 90;
  const CARD_GAP = 0.02;
  const step = CARD_WIDTH + screenWidth * CARD_GAP;

  useEffect(() => {
    if (cardPositions.length < communityCards.length) {
      setCardPositions((prev) => [...prev, new Animated.ValueXY({ x: -200, y: -200 })]);
    }
  }, [communityCards.length, cardPositions]);

  useEffect(() => {
    communityCards.forEach((_, index) => {
      if (cardPositions[index]) {
        Animated.timing(cardPositions[index], {
          toValue: {
            x: (index - 2) * step - CARD_WIDTH / 2,
            y: screenHeight / 2 - CARD_HEIGHT / 2 + 50,
          },
          duration: 1000 + index * 300,
          easing: Easing.out(Easing.ease),
          useNativeDriver: false,
        }).start();
      }
    });
  }, [communityCards, cardPositions, step, screenHeight]);

  return (
    <View position="absolute">
      {/* COMMUNITY-CARDS */}
      {communityCards.map((card, index) => (
        <Animated.View
          key={card.suit + card.rank}
          style={{
            position: "absolute",
            transform: cardPositions[index]?.getTranslateTransform() || [],
          }}
        >
          <Image source={getCardImagePath(card)} width={CARD_WIDTH} height={CARD_HEIGHT} />
        </Animated.View>
      ))}
    </View>
  );
};
