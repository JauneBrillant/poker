import React, { useState, useEffect } from "react";
import { GameState } from "@common/types";
import { PokerTable } from "components/PokerTable";
import { ActionButtons } from "components/ActionButtons";

export const GameScreen: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>();

  return (
    <>
      <PokerTable />
      <ActionButtons />
    </>
  );
};
