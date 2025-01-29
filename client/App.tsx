import { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createTamagui, TamaguiProvider } from "@tamagui/core";
import { HomeScreen, GameScreen, LobbyScreen, UsernameScreen } from "@screens";
import { RootStackParamList } from "types/RootStackParamList";
import { SocketProvider } from "contexts/SocketContext";
import { getUsername } from "utils/getUsername";
import defaultConfig from "@tamagui/config/v3";

const config = createTamagui(defaultConfig);

const Stack = createStackNavigator<RootStackParamList>();
const [username, setUsername] = useState<string | null>(null);

export default function App() {
  const [fontsLoaded] = useFonts({
    x10y12pxDonguriDuel: require("./assets/fonts/x10y12pxDonguriDuel.ttf"),
  });

  useEffect(() => {
    const fetchUsername = async () => {
      const fetchedUsername = await getUsername();
      setUsername(fetchedUsername);
    };

    fetchUsername();
  }, []);

  return (
    <SocketProvider>
      <NavigationContainer>
        <TamaguiProvider config={config}>
          <Stack.Navigator initialRouteName={username ? "Home" : "Username"}>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Username"
              component={UsernameScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Lobby"
              component={LobbyScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Game"
              component={GameScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </TamaguiProvider>
      </NavigationContainer>
    </SocketProvider>
  );
}
