import { StyleSheet } from "react-native";
import { Text, Card } from "tamagui";

type Player = {
  id: number;
  name: string;
  chips: number;
  isActive: boolean;
};

interface PlayerInfoProps {
  index: number;
  player: Player;
  playersLen: number;
}

export const PlayerInfo: React.FC<PlayerInfoProps> = ({
  index,
  player,
  playersLen,
}) => {
  const position = positionsByPlayerCount[playersLen]?.[index];
  return (
    <Card
      style={[
        styles.playerCard,
        { left: position.x, top: position.y },
        { background: player.isActive ? "#6eff90" : "#404040" },
      ]}
    >
      <Text style={styles.playerName}>{player.name}</Text>
      <Text style={styles.playerChips}>{player.chips}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  playerCard: {
    position: "absolute",
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  playerName: {
    fontWeight: "bold",
    color: "#fff",
  },
  playerChips: {
    color: "#fff",
  },
});

const positionsByPlayerCount: { [key: number]: { x: number; y: number }[] } = {
  2: [
    { x: 100, y: 450 },
    { x: 100, y: -50 },
  ],
  3: [
    { x: 100, y: 450 },
    { x: -50, y: 150 },
    { x: 230, y: 150 },
  ],
  4: [
    { x: 100, y: 450 },
    { x: -50, y: 180 },
    { x: 100, y: -50 },
    { x: 230, y: 180 },
  ],
  5: [
    { x: 100, y: 450 },
    { x: -50, y: 280 },
    { x: -50, y: 100 },
    { x: 230, y: 100 },
    { x: 230, y: 280 },
  ],
  6: [
    { x: 100, y: 450 },
    { x: -50, y: 280 },
    { x: -50, y: 100 },
    { x: 100, y: -50 },
    { x: 230, y: 100 },
    { x: 230, y: 280 },
  ],
  7: [
    { x: 100, y: 450 },
    { x: -50, y: 320 },
    { x: -50, y: 180 },
    { x: -50, y: 40 },
    { x: 230, y: 40 },
    { x: 230, y: 180 },
    { x: 230, y: 320 },
  ],
  8: [
    { x: 100, y: 450 },
    { x: -50, y: 320 },
    { x: -50, y: 180 },
    { x: -50, y: 40 },
    { x: 230, y: 40 },
    { x: 230, y: 180 },
    { x: 230, y: 320 },
    { x: 100, y: -50 },
  ],
};
