import { useState, useEffect } from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useSocket } from "contexts/SocketContext";
import { View, YStack, H2, Text } from "tamagui";
import { ListItem, Separator, XStack, YGroup } from "tamagui";
import { getUsername } from "../utils/getUsername";

type RootStackParamList = {
  Lobby: { lobbyId: string };
};

// prettier-ignore
type LobbyScreenNavigationProp = StackNavigationProp<RootStackParamList,"Lobby">;
type LobbyScreenRouteProp = RouteProp<RootStackParamList, "Lobby">;

interface LobbyScreenProps {
  navigation: LobbyScreenNavigationProp;
  route: LobbyScreenRouteProp;
}

type Player = {
  id: number;
  name: string | null;
};

export const LobbyScreen: React.FC<LobbyScreenProps> = () => {
  const socket = useSocket();
  const route = useRoute<LobbyScreenRouteProp>();
  const { lobbyId } = route.params;
  const [username, SetUsername] = useState<string | null>(null);
  const [players, setPlayers] = useState<Player[]>([{ id: 1, name: username }]);

  useEffect(() => {
    const fetcheUsername = async () => {
      const fetchedUsername = await getUsername();
      SetUsername(fetchedUsername);
    };

    fetcheUsername();
  }, []);

  return (
    <View flex={1} alignItems="center" marginTop="80">
      <H2
        style={{
          fontFamily: "x10y12pxDonguriDuel",
          fontSize: 30,
          color: "rgb(44, 189, 156)",
        }}
      >
        Lobby
      </H2>
      <YGroup separator={<Separator />}>{players.map((palyer) => {})}</YGroup>
    </View>
  );
};
