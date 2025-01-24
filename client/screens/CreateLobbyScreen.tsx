import React, { useState } from "react";
import { View, Text, DimensionValue } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CheckboxWithLabel } from "components/CheckboxWithLabel";
import { Button, Input } from "tamagui";
import { CreateLobbyRequest } from "@common/types";
import { createLobby } from "@services/http";

export const CreateLobbyScreen = () => {
  const navigation = useNavigation();
  const [isPrivate, setIsPrivate] = useState(false);
  const [password, setPassword] = useState("");

  const handleButtonClick = () => {
    const requestData: CreateLobbyRequest = {
      createrId: "aaa",
      isPrivate: isPrivate,
      password: isPrivate ? password : undefined,
    };
    createLobby(requestData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>lobby settings</Text>
      <CheckboxWithLabel
        label="private room"
        size="$6"
        checked={isPrivate}
        onCheckedChange={() => setIsPrivate(!isPrivate)}
      />
      <Input
        placeholder="Enter password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={isPrivate}
        style={styles.input}
      />
      <Button onPress={handleButtonClick}>create lobby</Button>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: "center" as "center",
    backgroundColor: "#f0eeb5",
  },
  title: {
    fontFamily: "x10y12pxDonguriDuel",
    fontSize: 40,
    color: "#2cdb9c",
    padding: 20,
    marginTop: 30,
    marginBottom: 20,
  },
  input: {
    width: "80%" as DimensionValue,
    marginTop: 10,
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    fontSize: 16,
  },
};
