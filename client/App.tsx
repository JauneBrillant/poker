import { SocketProvider } from "@contexts/SocketContext";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { GameScreen, HomeScreen, LobbyScreen, UsernameScreen } from "@screens";
import defaultConfig from "@tamagui/config/v3";
import { TamaguiProvider, createTamagui } from "@tamagui/core";
import { useFonts } from "expo-font";
import { useUsername } from "hooks/useUsername";
import { StrictMode } from "react";

const config = createTamagui(defaultConfig);

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    x10y12pxDonguriDuel: require("./assets/fonts/x10y12pxDonguriDuel.ttf"),
    "Proxima Nova Lt Semibold": require("./assets/fonts/Proxima-Nova-Semibold.ttf"),
  });

  return (
    <StrictMode>
      <SocketProvider>
        <NavigationContainer>
          <TamaguiProvider config={config}>
            <Stack.Navigator initialRouteName={useUsername() ? "Home" : "Username"}>
              <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
              <Stack.Screen
                name="Username"
                component={UsernameScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="Lobby" component={LobbyScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Game" component={GameScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
          </TamaguiProvider>
        </NavigationContainer>
      </SocketProvider>
    </StrictMode>
  );
}
