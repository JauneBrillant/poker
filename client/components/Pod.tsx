import { useState } from "react";
import type { LayoutChangeEvent } from "react-native/Libraries/Types/CoreEventTypes";
import { Text, View, useWindowDimensions } from "tamagui";

interface Props {
  podAmount: number;
}

export const Pod: React.FC<Props> = ({ podAmount }) => {
  const [podWidth, setPodWidth] = useState(0);
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const CARD_HEIGHT = 90;

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setPodWidth(width);
  };

  return (
    <View
      position="absolute"
      top={screenHeight / 2 - CARD_HEIGHT / 2}
      left={screenWidth / 2 - podWidth / 2}
      onLayout={handleLayout}
      //
    >
      <Text fontSize={20} fontWeight="bold">
        Pot: {podAmount}$
      </Text>
    </View>
  );
};
