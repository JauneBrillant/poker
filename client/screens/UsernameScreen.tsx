// import { useState } from "react";
// import { View, Input, Button, H5 } from "tamagui";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useNavigation } from "@react-navigation/native";
// import { RootStackParamList } from "types/RootStackParamList";
// import { StackNavigationProp } from "@react-navigation/stack";

// export const UsernameScreen = () => {
//   const navigation =
//     useNavigation<StackNavigationProp<RootStackParamList, "Username">>();
//   const [username, setUsername] = useState<string | null>(null);

//   const handleSaveUsername = async () => {
//     try {
//       if (username) {
//         await AsyncStorage.setItem("username", username);
//         navigation.replace("Home");
//       } else {
//         // TODO
//       }
//     } catch (error) {
//       console.log("Error saving username", error);
//     }
//   };

//   return (
//     <View>
//       <H5>ユーザ登録</H5>
//       <View
//         style={{
//           flex: 1,
//           justifyContent: "center",
//           alignItems: "center",
//           padding: 20,
//         }}
//       >
//         <Input width={300} placeholder="username"></Input>
//         <Button>a</Button>
//       </View>
//     </View>
//   );
// };

import { useState } from "react";
import { View, Input, Button, H5, Text } from "tamagui";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "types/RootStackParamList";
import { StackNavigationProp } from "@react-navigation/stack";

export const UsernameScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, "Username">>();
  const [username, setUsername] = useState<string | null>("");

  const handleSaveUsername = async () => {
    try {
      if (username) {
        await AsyncStorage.setItem("username", username);
        navigation.replace("Home");
      } else {
        // TODO: ユーザー名が空の場合の処理（例えば、エラーメッセージ表示）
      }
    } catch (error) {
      console.log("Error saving username", error);
    }
  };

  return (
    <View flex={1} justifyContent="center" alignItems="center" padding={20}>
      <H5 marginBottom={20}>ユーザ登録</H5>

      <View
        style={{
          width: "100%",
          maxWidth: 400,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
          backgroundColor: "#fff",
          borderRadius: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 3,
        }}
      >
        <Input
          value={username || ""}
          onChangeText={(text) => setUsername(text)}
          width="100%"
          placeholder="Enter username"
          style={{
            marginBottom: 15,
            paddingLeft: 10,
            borderWidth: 1,
            borderColor: "#ddd",
            borderRadius: 8,
            fontSize: 16,
          }}
        />
        <Button
          onPress={handleSaveUsername}
          width="100%"
          backgroundColor="#007BFF"
          color="#fff"
          fontWeight="bold"
          height={48}
          borderRadius={8}
        >
          保存
        </Button>
      </View>
    </View>
  );
};
