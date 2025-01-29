import React, { useState } from "react";
import { DimensionValue } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { createLobby, findLobby } from "@services/http";
import {
  CreateLobbyRequest,
  CreateLobbyResponse,
  FindLobbyRequest,
} from "@common/types";
import { View, Text, Button, Input } from "tamagui";

export const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<any, "Home">>();
  const [inputValue, setInputValue] = useState<string>("");
  const [existLobby, setExistLobby] = useState<boolean | null>(null);

  const requestData: CreateLobbyRequest = {
    hostName: "test",
  };

  const handleClickCreateLobby = async () => {
    try {
      const res: CreateLobbyResponse = await createLobby(requestData);
      if (res.success) {
        navigation.navigate("Lobby", { lobbyId: res.data?.lobbyId });
      } else {
        // TODO
        // ポップアップでロビー作成に失敗したことを表示する
      }
    } catch (error) {
      console.log("Failed to create lobby:", error);
    }
  };

  const handleClickFindLobby = async (lobbyId: string) => {
    console.log(lobbyId);
    // const existLobby = await findLobby(lobbyId);
    const existLobby = false;
    setExistLobby(existLobby);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Texas Holdem</Text>

      <View style={styles.buttonContainer}>
        <Button onPress={handleClickCreateLobby}>ロビーを作成</Button>
      </View>

      <View style={styles.buttonContainer}>
        <Text style={styles.text}>ロビーを探す</Text>
        <Input
          style={styles.textInput}
          placeholder={"lobby ID Here"}
          placeholderTextColor="rgb(150, 150, 150)"
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
        />
        <Button onPress={() => handleClickFindLobby(inputValue)}>
          ロビーを探す
        </Button>
        <Text style={styles.text}>
          {existLobby === null
            ? ""
            : existLobby
            ? "ロビーがありました"
            : "ロビーがありません"}
        </Text>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: "rgb(240, 238, 181)",
    padding: 20,
  },
  title: {
    fontFamily: "x10y12pxDonguriDuel",
    fontSize: 70,
    color: "rgb(44, 189, 156)",
    textAlign: "center" as "center",
    marginTop: 170,
    marginBottom: 70,
  },
  buttonContainer: {},
  textInput: {
    width: "100%" as DimensionValue,
    height: 40,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "rgb(161, 161, 161)",
    borderRadius: 4,
    backgroundColor: "rgb(255, 255, 255)",
    textAlign: "center" as "center",
  },
  text: {
    color: "rgb(0, 0, 0)",
    fontWeight: "bold" as "bold",
    textAlign: "left" as "left",
    marginTop: 20,
  },
};
