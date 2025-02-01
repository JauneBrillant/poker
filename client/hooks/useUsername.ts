import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export const useUsername = () => {
	const [username, setUsername] = useState<string>("");

	useEffect(() => {
		const fetchUsername = async () => {
			try {
				const fetchedUsername = await AsyncStorage.getItem("username");
				if (fetchedUsername) {
					setUsername(fetchedUsername);
				}
			} catch (error) {
				console.error("Failed to fetch username from AsyncStorage:", error);
			}
		};

		fetchUsername();
	}, []);

	return username;
};
