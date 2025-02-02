import { useSocket } from "@contexts/SocketContext";
import { useUsername } from "@hooks/useUsername";
import { useNavigation } from "@react-navigation/native";
import type { NavigationProp } from "@react-navigation/native";
import { createLobby, findLobby } from "@services/httpLobby";
import { joinLobby } from "@services/socketLobby";
import { useState } from "react";
import { Alert } from "react-native";
import type { DimensionValue } from "react-native";
import { Button, Input, Text, View } from "tamagui";
import type { RootStackParamList } from "types/RootStackParamList";

export const HomeScreen = () => {
	const socket = useSocket();
	const navigation =
		useNavigation<NavigationProp<RootStackParamList, "Home">>();
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
		<View style={styles.container}>
			<Text style={styles.title}>Texas Holdem</Text>

			<View style={styles.buttonContainer}>
				<Button onPress={handleClickCreateLobby}>ロビーを作成</Button>
			</View>

			<View style={styles.buttonContainer}>
				<Text style={styles.text}>ロビーを探す</Text>
				<Input
					style={styles.textInput}
					placeholder={"lobby ID Here"}
					placeholderTextColor="rgb(150, 150, 150)"
					value={inputValue}
					onChangeText={(text) => setInputValue(text)}
				/>
				<Button onPress={handleClickFindLobby}>ロビーを探す</Button>
			</View>
		</View>
	);
};

const styles = {
	container: {
		flex: 1,
		backgroundColor: "rgb(240, 238, 181)",
		padding: 20,
	},
	title: {
		fontFamily: "x10y12pxDonguriDuel",
		fontSize: 70,
		color: "rgb(44, 189, 156)",
		textAlign: "center" as const,
		marginTop: 170,
		marginBottom: 70,
	},
	buttonContainer: {},
	textInput: {
		width: "100%" as DimensionValue,
		height: 40,
		paddingHorizontal: 10,
		borderWidth: 1,
		borderColor: "rgb(161, 161, 161)",
		borderRadius: 4,
		backgroundColor: "rgb(255, 255, 255)",
		textAlign: "center" as const,
	},
	text: {
		color: "rgb(0, 0, 0)",
		fontWeight: "bold" as const,
		textAlign: "left" as const,
		marginTop: 20,
	},
};
