import { Player } from "@common/types";

const rotatePositions = (players: Player[]): Player[] => {
  const totalPlayers = players.length;

  const rotatedPlayers = players.map((player, index) => {
    const nextPositionIndex = (index + 1) % totalPlayers;
    return {
      ...player,
      position: players[nextPositionIndex].position,
    };
  });

  return rotatedPlayers;
};
