import { createContext, useContext, useEffect, useState } from "react";
import { Platform } from "react-native";
import io from "socket.io-client";

const SocketContext = createContext<SocketIOClient.Socket | null>(null);

const BASE_URL = "http://192.168.1.6:3000";
const LOCAL_URL = "http://localhost:3000";
const ANDROID_EMU_URL = "http://10.0.2.2:3000";
const SERVER_URL = Platform.OS === "ios" ? LOCAL_URL : ANDROID_EMU_URL;

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);

	useEffect(() => {
		const socketInstance = io(BASE_URL);
		setSocket(socketInstance);

		return () => {
			socketInstance.disconnect();
		};
	}, []);

	return (
		<SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
	);
};

export const useSocket = () => useContext(SocketContext);
