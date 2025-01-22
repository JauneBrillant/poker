import React from "react";
import { View, Text, Button } from "react-native";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    x10y12pxDonguriDuel: require("../assets/fonts/x10y12pxDonguriDuel.ttf"),
  });

  const handleCreateLobby = () => {};
  const handleFindLobby = () => {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Texas Holdem</Text>
      <View style={styles.buttonContainer}>
        <Button title="ロビーを作成" onPress={handleCreateLobby} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="ロビーを探す" onPress={handleFindLobby} />
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

export default HomeScreen;
