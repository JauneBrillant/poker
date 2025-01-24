import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createTamagui, TamaguiProvider, View } from "@tamagui/core";
import { HomeScreen } from "@screens";
import { useFonts } from "expo-font";
import defaultConfig from "@tamagui/config/v3";

const config = createTamagui(defaultConfig);

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    x10y12pxDonguriDuel: require("./assets/fonts/x10y12pxDonguriDuel.ttf"),
  });

  return (
    <NavigationContainer>
      <TamaguiProvider config={config}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </TamaguiProvider>
    </NavigationContainer>
  );
}
