import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import HomeIcon from "../assets/icons/homeActive.svg";
import ListIcon from "../assets/icons/list.svg";
import UserIcon from "../assets/icons/user.svg";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const RecordScreen = () => {
  const navigation = useNavigation();
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const Home = () => {
    navigation.navigate("Home");
  };
  const UpdateScreen = () => {
    navigation.navigate("UpdateScreen");
  };
  /* const authToken = await AsyncStorage.getItem("authToken"); */
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const authToken = await AsyncStorage.getItem("authToken");
        const response = await axios.get(
          `${process.env.EXPO_PUBLIC_API_URL_SOCKET}/alerta-users-user/todos`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        setHistoryData(response.data); // Asumiendo que la respuesta tiene el formato adecuado
      } catch (error) {
        console.error("Error fetching history", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial</Text>
      {loading ? (
        <View style={styles.containerlanding}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.recordContainer} showsVerticalScrollIndicator={false}>
          {historyData.map((record, index) => (
            <TouchableOpacity key={index} style={styles.record}>
              <View style={styles.recordGroupOne}>
                <Text
                  style={styles.recordTitle}
                >{`Alerta: ${record.alerta.tipo_alerta}`}</Text>
                <Text
                  style={styles.recordInfo}
                >{`Tienda: ${record.user.numeroTienda}`}</Text>
                <Text
                  style={styles.recordInfo}
                >{`Piso: ${record.user.piso}`}</Text>
              </View>
              <View style={styles.recordGroupTwo}>
                <Text
                  style={styles.recordInfoTwo}
                >{`Hora: ${record.hora}`}</Text>
                <Text
                  style={styles.recordInfoTwo}
                >{`Fecha: ${record.fecha}`}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      <View style={styles.optionsContainer}>
        <TouchableOpacity onPress={Home}>
          <HomeIcon style={styles.iconOptions} width={24} height={24} />
        </TouchableOpacity>
        <View style={styles.buttonListOptionsContainer}>
          <TouchableOpacity style={styles.buttonListOptions}>
            <ListIcon style={styles.iconListOptions} width={24} height={24} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={UpdateScreen}>
          <UserIcon style={styles.iconOptions} width={24} height={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Asegura que el contenedor ocupe todo el espacio disponible
    backgroundColor: "#FBFBFB",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000",
  },
  recordContainer: {
    flexGrow: 1,
    paddingBottom: 20, // Espacio adicional al final para evitar superposición con el footer
  },
  record: {
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gapHorizontal: 16,
    flexWrap: "wrap",
  },
  recordTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
  },
  recordInfo: {
    fontSize: 12,
    fontWeight: "600",
    color: "#C1C1C1",
  },
  recordGroupOne: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  recordGroupTwo: {
    marginLeft: "auto",
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  recordInfoTwo: {
    fontSize: 12,
    fontWeight: "600",
    color: "#C1C1C1",
    textAlign: "right",
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: "auto",
    paddingVertical: 32,
    backgroundColor: "#fff",
    height: 95,
  },
  iconOptions: {
    width: 32,
    height: 32,
  },
  buttonListOptionsContainer: {
    width: 95,
    height: 95,
    marginTop: "-25%",
    borderRadius: 50,
    backgroundColor: "#FBFBFB",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonListOptions: {
    width: 70,
    height: 70,
    backgroundColor: "#509BF8",
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  iconListOptions: {
    width: 36,
    height: 36,
  },
  containerlanding: {
    flex: 1,
    height: "100%",
    display: "flex",
    justifyContent:"center"
  },
});

export default RecordScreen;
