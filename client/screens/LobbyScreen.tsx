import { SocketEvent } from "@common/types";
import type { LobbyUpdateEventPayload } from "@common/types";
import type { GameStartedEventPayload } from "@common/types";
import { useUsername } from "@hooks/useUsername";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { AlignJustify, SquareChevronLeft } from "@tamagui/lucide-icons";
import { Crown, Dot, SquarePlay } from "@tamagui/lucide-icons";
import { useSocket } from "contexts/SocketContext";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { Button, H2, ListItem, Text, View, XStack, YGroup, YStack } from "tamagui";
import type { RootStackParamList } from "types/RootStackParamList";
import { Color } from "../theme/Color";

export const LobbyScreen: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, "Lobby">>();
  const { lobbyId } = route.params;
  const socket = useSocket();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, "Lobby">>();
  const username = useUsername();
  const [players, setPlayers] = useState<string[]>([]);

  useEffect(() => {
    const handleLobbyUpdate = ({ updatedPlayers }: LobbyUpdateEventPayload) => {
      setPlayers(updatedPlayers);
    };

    socket?.on(SocketEvent.GAME_STARTED, ({ initialGameState }: GameStartedEventPayload) => {
      navigation.navigate("Game", { lobbyId, initialGameState });
    });
    socket?.on(SocketEvent.LOBBY_UPDATE, handleLobbyUpdate);

    return () => {
      socket?.off(SocketEvent.LOBBY_UPDATE, handleLobbyUpdate);
      // socket?.off(SocketEvent.GAME_STARTED);
    };
  }, [socket, navigation, lobbyId]);

  const handleClickGameStart = () => {
    if (players.length <= 1) {
      Alert.alert("一人ではゲーム開始できません。");
      return;
    }

    if (lobbyId !== username) {
      Alert.alert("ホスト以外ゲームを開始できません。");
      return;
    }

    socket?.emit(SocketEvent.GAME_START, { lobbyId, players });
  };

  const handleClickArrowBtn = () => {
    if (__DEV__) {
      navigation.pop();
      return;
    }

    Alert.alert("確認", "ロビーから抜けますか？", [
      { text: "キャンセル", style: "cancel" },
      { text: "OK", onPress: () => navigation.pop() },
    ]);
  };

  return (
    <YStack flex={1} alignItems="center" backgroundColor={Color.offWhite}>
      <XStack width="90%" justifyContent="space-between">
        <Button unstyled icon={SquareChevronLeft} size={70} top="$11" onPress={handleClickArrowBtn} />
        <Button
          unstyled
          icon={AlignJustify}
          size={70}
          top="$11"
          // onPress={handleClickSettingsBtn}
        />
      </XStack>

      <H2 fontSize={30} marginTop="$13" marginBottom={10} style={{ fontFamily: "Proxima Nova Lt Semibold" }}>
        {lobbyId}'s Lobby
      </H2>

      <View width="70%" marginTop="$10">
        <YGroup gap={10}>
          {players.map((player, index) => (
            <YGroup.Item key={player}>
              <ListItem gap="$10" borderRadius={10} backgroundColor={Color.offGreen}>
                <XStack>
                  <Button.Icon>{player === lobbyId ? <Crown marginRight={10} /> : <Dot marginRight={10} />}</Button.Icon>
                  <Text fontFamily={"Proxima Nova Lt Semibold"}>{player}</Text>
                </XStack>
              </ListItem>
            </YGroup.Item>
          ))}
        </YGroup>

        <Button iconAfter={<SquarePlay size="50" />} backgroundColor={Color.pink} marginLeft="auto" bottom={-300} onPress={handleClickGameStart}>
          <Text fontSize="$4" fontFamily={"Proxima Nova Lt Semibold"}>
            START
          </Text>
        </Button>
      </View>
    </YStack>
  );
};
