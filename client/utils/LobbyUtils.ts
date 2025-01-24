export const getCreateLobbyRequestData = () => {
  return {
    hostPlayer: getHostPlayer(),
    gameRules: getDefaultGameRules(),
  };
};

const getHostPlayer = () => {
  return {
    // 将来的に動的に取得する
    playerId: "player1",
    usename: "Alice",
  };
};

const getDefaultGameRules = () => {
  return {
    smallBlind: 10,
    bigBlind: 20,
    staringChips: 1000,
  };
};
