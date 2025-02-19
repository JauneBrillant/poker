import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";

const LOCAL_URL = "http://localhost:3000";
const SocketContext = createContext<SocketIOClient.Socket | null>(null);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);

  useEffect(() => {
    const socketInstance = io(LOCAL_URL);
    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export const useSocket = (): SocketIOClient.Socket => {
  const socket = useContext(SocketContext);
  if (!socket) {
    throw new Error("socket is not available");
  }
  return socket;
};
