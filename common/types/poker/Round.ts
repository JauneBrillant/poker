export enum Round {
  PRE_FLOP = "PreFrop",
  FLOP = "Flop",
  TURN = "Turn",
  RIVER = "River",
  SHOWDOWN = "ShowDown",
}

const RoundArray: Round[] = Object.values(Round);

export function getNextRound(current: Round): Round {
  const currentIndex = RoundArray.indexOf(current);
  return RoundArray[currentIndex + 1] ?? current;
}
