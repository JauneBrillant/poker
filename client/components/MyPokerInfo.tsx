import type { GameState, Player } from "@common/types";
import { useUsername } from "@hooks/useUsername";
import { Image, View, XGroup, XStack } from "tamagui";
import { Color } from "theme/Color";
import { getCardImagePath } from "utils/getCardImagePath";

interface props {
  gameState: GameState;
}

export const MyPokerInfo: React.FC<props> = ({ gameState }) => {
  const myName = useUsername();
  const player = gameState.players.find((p) => p.name === myName);

  return (
    <View
      // position="absolute"
      // left={20}
      // bottom={20}
      backgroundColor={Color.pink}
    >
      <XGroup>
        {player?.hand.cards.map((card) => (
          <Image key={card.suit + card.rank} source={getCardImagePath(card)} width={60} height={90} />
        ))}
      </XGroup>
    </View>
  );
};
