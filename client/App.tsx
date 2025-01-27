import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createTamagui, TamaguiProvider, View } from "@tamagui/core";
import { HomeScreen, GameScreen } from "@screens";
import defaultConfig from "@tamagui/config/v3";
import { SocketProvider } from "contexts/SocketContext";

const config = createTamagui(defaultConfig);
const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    x10y12pxDonguriDuel: require("./assets/fonts/x10y12pxDonguriDuel.ttf"),
  });

  return (
    <SocketProvider>
      <NavigationContainer>
        <TamaguiProvider config={config}>
          <Stack.Navigator initialRouteName="game">
            <Stack.Screen
              name="game"
              component={GameScreen}
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </TamaguiProvider>
      </NavigationContainer>
    </SocketProvider>
  );
}
