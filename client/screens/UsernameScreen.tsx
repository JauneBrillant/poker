import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import type { NavigationProp } from "@react-navigation/native";
import { Bird, Search } from "@tamagui/lucide-icons";
import { useState } from "react";
import { Button, H5, Input, Text, View, XStack, YStack } from "tamagui";
import { Color } from "theme/Color";
import type { RootStackParamList } from "types/RootStackParamList";

export const UsernameScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList, "Username">>();
  const [username, setUsername] = useState<string | null>("");

  const handleSaveUsername = async () => {
    try {
      if (username) {
        await AsyncStorage.setItem("username", username);
        navigation.navigate("Home");
      } else {
        // TODO: ユーザー名が空の場合の処理（例えば、エラーメッセージ表示）
      }
    } catch (error) {
      console.log("Error saving username", error);
    }
  };

  return (
    <YStack flex={1} alignItems="center" backgroundColor={Color.offWhite}>
      <Text color={Color.green} textAlign="center" fontFamily={"x10y12pxDonguriDuel"} fontSize={70} marginTop="$20" padding="$2">
        Texas Holdem
      </Text>

      <YStack width="70%" marginTop={100}>
        <XStack gap="$2">
          <Input flex={1} fontSize={15} placeholder={"Username"} backgroundColor={Color.offGreen} borderColor={Color.grey} style={{ fontFamily: "Proxima Nova Lt Semibold" }} onChangeText={(text) => setUsername(text)} />
          <Button icon={Bird} backgroundColor={Color.green} onPress={handleSaveUsername} />
        </XStack>
        <Text alignSelf="center" marginTop="$3" fontFamily="Proxima Nova Lt Semibold">
          or
        </Text>
        <Button alignSelf="center" justifyContent="center" width="50%" marginTop="$3" backgroundColor={Color.pink} borderColor={Color.grey}>
          <Text fontFamily="Proxima Nova Lt Semibold">Play as a Guest</Text>
        </Button>
      </YStack>
    </YStack>
  );
};
