import React from "react";
import { View, Text, Button } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { createLobby } from "@services/http";
import { CreateLobbyRequest } from "@common/types";

export const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<any, "Home">>();
  const requestData: CreateLobbyRequest = {
    hostName: "test",
  };

  const handleClickCreateLobby = async () => {
    const robbyId = await createLobby(requestData);
    console.log(robbyId);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Texas Holdem</Text>
      <View style={styles.buttonContainer}>
        <Button title="ロビーを作成" onPress={handleClickCreateLobby} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="ロビーを探す" onPress={() => {}} />
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#f0eeb5",
    padding: 20,
  },
  buttonContainer: {},
  title: {
    fontFamily: "x10y12pxDonguriDuel",
    fontSize: 70,
    color: "#2cbd9c",
    textAlign: "center" as "center",
    marginTop: 170,
    marginBottom: 70,
  },
};
