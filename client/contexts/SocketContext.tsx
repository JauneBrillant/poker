import io from "socket.io-client";
import { useState, useEffect, useContext, createContext } from "react";

const SocketContext = createContext<SocketIOClient.Socket | null>(null);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);

  useEffect(() => {
    const serverUrl = "http://10.0.2.2:3000";
    const socketInstance = io(serverUrl);
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
