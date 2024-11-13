import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import ExitIcon from "../assets/icons/exit.svg";
import HomeIcon from "../assets/icons/homeActive.svg";
import ListIcon from "../assets/icons/list.svg";
import UserIcon from "../assets/icons/user.svg";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useAuth } from "../context/AuthContext/AuthContext";
import { useNavigation } from "@react-navigation/native";
const BtnScreen = () => {
  const now = new Date();
  const dayOfWeek = format(now, "EEEE", { locale: es });
  const date = format(now, "dd 'de' MMMM, yyyy", { locale: es });
  const hour = format(now, "hh:mm a", { locale: es });
  const { logout, socket } = useAuth();
  const navigation = useNavigation();
  const handleLogout = async () => {
    await logout();
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };
  const handleAlertAndOtherActions = () => {
    console.log("Intentando enviar alerta...");
    if (socket) {
      const alertMessage =
        "¡Alerta de robo! Se ha detectado actividad sospechosa. Por favor, asegúrese de su seguridad y comuníquese con las autoridades.";
      socket.emit("alerta", { message: alertMessage });
      console.log("Alerta enviada:", { message: alertMessage });

      Alert.alert(
        "Alerta enviada",
        "¡La alerta ha sido enviada correctamente!"
      );
    } else {
      console.error("Socket no está conectado");
    }
  };
  const RecordScreen = () => {
    navigation.navigate("RecordScreen");
  };
  const UpdateScreen = () => {
    navigation.navigate("UpdateScreen");
  };
/*   const ScreenAlert =()=>{
    navigation.navigate("Alert")
  } */

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{dayOfWeek}</Text>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.hour}>{hour}</Text>
        </View>
        <TouchableOpacity style={styles.buttonExit} onPress={handleLogout}>
          <ExitIcon style={styles.iconExit} width={24} height={24} />
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <Image
          source={require("../../assets/alert-exclamation.png")}
          style={styles.iconAlert}
        />
        <Text style={styles.info}>Usar solo en casos</Text>
        <Text style={styles.info}>de emergencia</Text>
      </View>
      <View style={styles.alertContainer}>
        <TouchableOpacity
          style={styles.borderAlert}
          onPress={handleAlertAndOtherActions}
        >
          <View style={styles.buttonAlert}>
            <Image
              source={require("../../assets/alerta.png")}
              style={styles.imgAlert}
            />
          </View>
        </TouchableOpacity>
        <Text style={styles.textAlert}>Presiona aquí</Text>
      </View>
      <View style={styles.optionsContainer}>
        <TouchableOpacity>
          <HomeIcon style={styles.iconOptions} width={24} height={24} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonExit, styles.buttonListOptions]}
          onPress={RecordScreen}
        >
          <ListIcon style={styles.iconListOptions} width={24} height={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={UpdateScreen}>
          <UserIcon style={styles.iconOptions} width={24} height={24} />
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={ScreenAlert}>
          <Text>Alerta</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    justifyContent: "center",
    width: "100vw",
    paddingTop: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: "700",
    color: "#000",
  },
  date: {
    color: "#7d7d7d",
    fontSize: 20,
    fontWeight: "600",
  },
  hour: {
    color: "#7c7c7c",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonExit: {
    width: 45,
    height: 45,
    backgroundColor: "#509BF8",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  iconExit: {
    width: 20,
    height: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  infoContainer: {
    alignItems: "center",
    margin: 48,
  },
  iconAlert: {
    width: 20,
    height: 20,
    marginBottom: 8,
  },
  info: {
    fontSize: 14,
    fontWeight: "600",
    color: "#7c7c7c",
    textAlign: "center",
  },
  alertContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  borderAlert: {
    width: 245,
    height: 245,
    backgroundColor: "#e2071366",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    borderRadius: 50,
  },
  buttonAlert: {
    width: 225,
    height: 225,
    backgroundColor: "#e20713",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  imgAlert: {
    width: 120,
    height: 120,
  },
  textAlert: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    textAlign: "center",
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: "auto",
    paddingVertical: 32,
  },
  iconOptions: {
    width: 32,
    height: 32,
  },
  buttonListOptions: {
    width: 70,
    height: 70,
    marginTop: -70,
  },
  iconListOptions: {
    width: 36,
    height: 36,
  },
});

export default BtnScreen;
