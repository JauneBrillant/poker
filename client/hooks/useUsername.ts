import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export const useUsername = () => {
  // if (__DEV__) {
  // 	return `${Math.floor(Math.random() * 10000)}`;
  // }

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
