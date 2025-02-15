import { useSocket } from "@contexts/SocketContext";
import { useUsername } from "@hooks/useUsername";
import { useNavigation } from "@react-navigation/native";
import type { NavigationProp } from "@react-navigation/native";
import { createLobby, findLobby } from "@services/httpLobby";
import { joinLobby } from "@services/socketLobby";
import { Search } from "@tamagui/lucide-icons";
import { Settings } from "@tamagui/lucide-icons";
import { useState } from "react";
import { Alert } from "react-native";
import { Button, H1, Input, Text, XStack, YStack } from "tamagui";
import type { RootStackParamList } from "types/RootStackParamList";
import { Color } from "../theme/Color";

export const HomeScreen = () => {
  const socket = useSocket();
  const navigation = useNavigation<NavigationProp<RootStackParamList, "Home">>();
  const username = useUsername();
  const [inputValue, setInputValue] = useState<string>("");

  const handleClickCreateLobby = async () => {
    try {
      await createLobby(username);
      joinLobby(socket, username, username);
      navigation.navigate("Lobby", { lobbyId: username });
    } catch (error) {
      Alert.alert("ロビーの作成に失敗しました。");
    }
  };

  const handleClickFindLobby = async () => {
    try {
      await findLobby(inputValue);
      joinLobby(socket, inputValue, username);
      navigation.navigate("Lobby", { lobbyId: inputValue });
    } catch (error) {
      Alert.alert("ロビーの検索に失敗しました。");
    }
  };

  return (
    <YStack flex={1} alignItems="center" backgroundColor={Color.offWhite} padding={10}>
      <Button
        unstyled
        icon={Settings}
        size={70}
        top="$11"
        style={{ marginLeft: "auto" }}
        // onPress={handleClickSettingsBtn}
      />

      <Text
        color={Color.green}
        textAlign="center"
        fontFamily={"x10y12pxDonguriDuel"}
        fontSize={70}
        marginTop="$20"
        padding="$2"
      >
        Texas Holdem
      </Text>

      <YStack alignSelf="center" width={240} padding="$2" gap="9" marginTop={20}>
        <Button backgroundColor={Color.offGreen} onPress={handleClickCreateLobby}>
          <Text fontSize={16} fontFamily={"x10y12pxDonguriDuel"}>
            クリエイトロビー
          </Text>
        </Button>
        <XStack gap="$2">
          <Input
            flex={1}
            fontSize={15}
            placeholder={"ファインドロビー"}
            backgroundColor={Color.pink}
            style={{ fontFamily: "x10y12pxDonguriDuel" }}
            onChangeText={(text) => setInputValue(text)}
          />
          <Button icon={Search} backgroundColor={Color.green} onPress={handleClickFindLobby} />
        </XStack>
      </YStack>
    </YStack>
  );
};
