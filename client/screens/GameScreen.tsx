import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { GameState } from "@common/types";
import { socketService } from "@services/socket";
import {
  startGame,
  listenToGameStart,
  listenToGameStateUpdate,
} from "@services/socket";

const GameScreen = () => {
  const [gameState, setGameState] = useState<GameState>();

  useEffect(() => {
    socketService.initializeSocket("http://10.0.2.2:3000");

    listenToGameStart(setGameState);
    listenToGameStateUpdate(setGameState);

    return () => {
      socketService.disconnectSocket();
    };
  });

  const handleStartGame = () => {
    console.log("Starting game...");
    startGame();
  };

  return (
    <View>
      <Text>Game Screen</Text>
      <Button title="Start Game" onPress={handleStartGame} />
      <Text>{JSON.stringify(gameState)}</Text>
    </View>
  );
};

export default GameScreen;
