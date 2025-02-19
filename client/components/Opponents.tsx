import type { Player } from "@common/types";
import { useUsername } from "@hooks/useUsername";
import { Card, Circle, Paragraph, Text, View, XStack } from "tamagui";
import { Color } from "theme/Color";

interface Props {
  players: Player[];
}

// const demo = [
//   {
//     name: "onedsfadf",
//     chips: "234",
//     position: "BB",
//     currentRoundBet: 30,
//   },
//   {
//     name: "twodskfja",
//     chips: "234",
//     position: "SB",
//     currentRoundBet: 200,
//   },
//   {
//     name: "t",
//     chips: "234",
//     position: "UTG",
//     currentRoundBet: 0,
//   },
// ];

export const Opponents: React.FC<Props> = ({ players }) => {
  const username = useUsername();
  const opponents = players.filter((p) => p.name !== username);
  // const opponents = demo;

  return (
    <XStack marginBottom={200} gap="$5">
      {opponents.map((p) => (
        <Card key={p.name} backgroundColor={Color.offWhite}>
          <View position="absolute" top={-20} left={0}>
            <Text fontSize={12} fontWeight="bold">
              {p.position}
            </Text>
          </View>

          <Card.Header bordered>
            <Text fontWeight="bold" textAlign="center">
              {p.name}
            </Text>
            <Paragraph textAlign="center">{p.chips}</Paragraph>
          </Card.Header>

          <View
            position="absolute"
            bottom={-40}
            left="50%"
            style={{ transform: [{ translateX: -15 }] }}
          >
            <Circle
              size={30}
              backgroundColor={Color.offGreen}
              justifyContent="center"
              alignItems="center"
            >
              <Text fontWeight="bold" fontSize={12}>
                {p.currentRoundBet}
              </Text>
            </Circle>
          </View>
        </Card>
      ))}
    </XStack>
  );
};
