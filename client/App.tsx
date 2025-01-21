import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { StatusBar } from "expo-status-bar";

import { io, Socket } from "socket.io-client";

import { Card } from "@common/Card";
import { HandEvaluationResponse } from "@common/HandEvaluationResponse";

export default function App() {
  const [socket, setSocket] = useState<Socket>();
  const [hand, setHand] = useState<Card[]>([
    new Card("HEARTS", "10"),
    new Card("HEARTS", "J"),
    new Card("HEARTS", "Q"),
    new Card("HEARTS", "K"),
    new Card("HEARTS", "A"),
  ]);
  const [result, setResult] = useState<HandEvaluationResponse>();

  useEffect(() => {
    const socket = io("http://10.0.2.2:3000");
    socket.on("connect_error", (error) => {
      console.error("接続エラー:", error);
    });

    socket.on("connect_timeout", () => {
      console.error("接続タイムアウト");
    });

    setSocket(socket);

    socket.on("connect", () => {
      console.log("サーバーと接続されました");
    });

    socket.on("disconnect", () => {
      console.log("サーバーとの接続が切れました");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  const evaluateHand = () => {
    console.log("ボタンが押された");
    if (socket) {
      console.log("役を判定します");
      socket.emit("evaluateHand", hand, (response: HandEvaluationResponse) => {
        setResult(response);
        console.log("役を判定しました", response);
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>カード:</Text>
      <View>
        {hand.map((card, index) => (
          <Text key={index}>{card.toString()}</Text>
        ))}
      </View>
      <Button title="役を判定" onPress={evaluateHand} />
      {result && (
        <Text style={styles.result}>
          役: {result.rank} ({result.strength})
        </Text>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  result: {
    fontSize: 18,
    marginTop: 20,
    color: "blue",
  },
});
