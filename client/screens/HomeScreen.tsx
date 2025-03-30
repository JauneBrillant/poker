import { SocketEvent } from "@common/types";
import { useSocket } from "@contexts/SocketContext";
import { useUsername } from "@hooks/useUsername";
import { useNavigation } from "@react-navigation/native";
import type { NavigationProp } from "@react-navigation/native";
import { Search } from "@tamagui/lucide-icons";
import { Settings } from "@tamagui/lucide-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { Alert } from "react-native";
import { Button, Input, Text, XStack, YStack } from "tamagui";
import type { RootStackParamList } from "types/RootStackParamList";
import { Color } from "../theme/Color";
import { Fonts } from "../theme/Fonts";

export const HomeScreen = () => {
  const socket = useSocket();
  const navigation = useNavigation<NavigationProp<RootStackParamList, "Home">>();
  const userName = useUsername();
  const [lobbyName, setLobbyName] = useState<string>("");

  const handleClickCreateLobby = () => {
    socket.on(SocketEvent.LOBBY_CREATE_SUCCESS, () => navigation.navigate("Lobby", { lobbyName }));
    socket.on(SocketEvent.LOBBY_CREATE_FAILED, () => {
      Alert.alert("Failed to create lobby");
    });
    socket.emit(SocketEvent.LOBBY_CREATE, userName);
  };

  const handleClickJoinLobby = async () => {
    socket.on(SocketEvent.LOBBY_JOIN_SUCCESS, () => navigation.navigate("Lobby", { lobbyName }));
    socket.on(SocketEvent.LOBBY_JOIN_FAILED, () => {
      Alert.alert("Failed to join lobby, Check input is correct");
    });
    socket.emit(SocketEvent.LOBBY_JOIN, lobbyName, userName);
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
        fontFamily={Fonts.donguri}
        fontSize={70}
        marginTop="$20"
        padding="$2"
      >
        Texas Holdem
      </Text>

      <YStack alignSelf="center" width={240} padding="$2" gap="9" marginTop={20}>
        <Button backgroundColor={Color.offGreen} onPress={handleClickCreateLobby}>
          <Text fontSize={16} fontFamily={Fonts.donguri}>
            クリエイトロビー
          </Text>
        </Button>
        <XStack gap="$2">
          <Input
            flex={1}
            fontSize={15}
            placeholder={"ジョインロビー"}
            backgroundColor={Color.pink}
            style={{ fontFamily: Fonts.donguri }}
            onChangeText={(text) => setLobbyName(text)}
          />
          <Button icon={Search} backgroundColor={Color.green} onPress={handleClickJoinLobby} />
        </XStack>
      </YStack>
    </YStack>
  );
};
