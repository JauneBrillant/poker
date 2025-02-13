import type { Player } from "@common/types";
import { Text, View } from "tamagui";

interface Props {
  oppenents: Player[];
}

export const Opponents: React.FC<Props> = ({ oppenents }) => {
  return (
    <View>
      <Text>aaa</Text>
    </View>
  );
};
