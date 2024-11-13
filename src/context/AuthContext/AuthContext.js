import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import io from "socket.io-client";
const AuthContext = createContext();
export const AuthProvider = ({ children, navigation }) => {
  const [token, setToken] = useState(null);
  const [socket, setSocket] = useState(null);
  const [alertData, setAlertData] = useState(null);
  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await AsyncStorage.getItem("authToken");
      if (storedToken) {
        setToken(storedToken);
      }
    };

    loadToken();
  }, []);
  useEffect(() => {
    if (token) {
      const socketConnection = io(`${process.env.EXPO_PUBLIC_URL_SOCKET}`, {
        query: { token },
        transports: ['websocket'], 
      });
      socketConnection.on("connect", () => {
        console.log("Conexión Socket.IO abierta");
      });
      socketConnection.on("message", (data) => {
        console.log("Mensaje recibido:", data);
      });
      socketConnection.on("alerta", (data) => {
        const { message } = data.data;
        const { nombres, piso, pasillo, numeroTienda } = data;
        
        setAlertData({
          message,
          nombres,
          piso,
          pasillo,
          numeroTienda
        });
      });
      
      socketConnection.on("disconnect", () => {
        console.log("Conexión Socket.IO cerrada");
      });
      socketConnection.on("error", (error) => {
        console.error("Error en Socket.IO:", error);
      });
      setSocket(socketConnection);
      return () => {
        socketConnection.disconnect();
      };
    }
  }, [token]);
  
  const storeToken = async (newToken) => {
    setToken(newToken);
    await AsyncStorage.setItem("authToken", newToken);
  };

  const logout = async () => {
    setToken(null);
    await AsyncStorage.clear();
    if (socket) {
      socket.disconnect();
    }
  };
  return (
    <AuthContext.Provider value={{ token, setToken: storeToken, logout,socket,alertData  }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};
