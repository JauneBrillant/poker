import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { PlayerInfo } from "./PlayerInfo";

type Player = {
  id: number;
  name: string;
  chips: number;
  isActive: boolean;
};

const players: Player[] = [
  { id: 1, name: "1", chips: 1, isActive: true },
  { id: 2, name: "2", chips: 10000, isActive: true },
  { id: 3, name: "3", chips: 5000, isActive: true },
  { id: 4, name: "4", chips: 8000, isActive: false },
  { id: 5, name: "5", chips: 15000, isActive: true },
  { id: 6, name: "6", chips: 9000, isActive: false },
  { id: 7, name: "7", chips: 9000, isActive: false },
  { id: 8, name: "8", chips: 9000, isActive: false },
];

export const PokerTable: React.FC = () => {
  const playerLen = players.length;

  return (
    <View style={styles.container}>
      <View style={styles.table}>
        {players.map((player, index) => {
          return (
            <PlayerInfo
              key={player.id}
              index={index}
              player={player}
              playersLen={playerLen}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2C3639",
  },
  table: {
    backgroundColor: "#006400",
    position: "relative",
    width: 270,
    height: 480,
    borderRadius: 240,
    borderWidth: 2,
    borderColor: "#ccc",
  },
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
