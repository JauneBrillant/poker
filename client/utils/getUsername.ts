import AsyncStorage from "@react-native-async-storage/async-storage";

export const getUsername = () => {
  const username = fetchUsername();
  return username;
};

const fetchUsername = async () => {
  try {
    const username = await AsyncStorage.getItem("username");
    return username || "";
  } catch (error) {
    console.log("Error read username", error);
    return "";
  }
};
