import React from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";

export const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<any, "Home">>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Texas Holdem</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="ロビーを作成"
          onPress={() => navigation.navigate("CreateLobby")}
        />
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
