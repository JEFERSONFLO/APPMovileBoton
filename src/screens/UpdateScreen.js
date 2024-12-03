import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,ActivityIndicator
} from "react-native";
import ListIcon from "../assets/icons/list.svg";
import UserIcon from "../assets/icons/user.svg";
import HomeIcon from "../assets/icons/homeActive.svg";
import { useNavigation } from "@react-navigation/native";
import me from "../services/user/me";
import AsyncStorage from "@react-native-async-storage/async-storage";
import update from "../services/user/update";
const UpdateScreen = () => {
  const [userData, setUserData] = useState({
    dni: "",
    nombres: "",
    apellidos: "",
    celular: "",
    numeroTienda: "",
    piso: "",
    pasillo: "",
  });
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const Home = () => {
    navigation.navigate("Home");
  };
  const UpdateScreen = () => {
    navigation.navigate("UpdateScreen");
  };
  const RecordScreen = () => {
    navigation.navigate("RecordScreen");
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const authToken = await AsyncStorage.getItem("authToken");
        const response = await me(authToken);
        console.log("Fetched user data:", response);
        if (response) {
          setUserData({
            dni: response.dni || "",
            nombres: response.nombres || "",
            apellidos: response.apellidos || "",
            celular: response.celular || "",
            numeroTienda: response.numeroTienda || "",
            piso: response.piso || "",
            pasillo: response.pasillo || "",
            fotoUrl: response.fotoUrl || "",
          });
        }
      } catch (error) {
        Alert.alert("Error", error.message, [{ text: "OK" }]);
        console.error("Error fetching data:", error);
      } finally{
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const UpdateUser = async () => {
    try {
      setLoading(true);
      const authToken = await AsyncStorage.getItem("authToken");
      const response = await update(authToken, userData);
      Alert.alert("Actualizado", "Tu perfil ha sido actualizado", [
        { text: "OK" },
      ]);
    } catch (error) {
      Alert.alert("Error", error.message, [{ text: "OK" }]);
      console.error("Error updating user data:", error.message);
    } finally{
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
       {loading ? (
        <View style={styles.containerlanding}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
      <ScrollView contentContainerStyle={styles.containerFomr} showsVerticalScrollIndicator={false}>
        {userData.fotoUrl ? (
          <Image source={{ uri: userData.fotoUrl }} style={styles.logo} />
        ) : (
          <Image source={require("../assets/icon.png")} style={styles.logo} />
        )}
        <Text style={styles.title}>Editar perfil</Text>
        <Text style={styles.label}>DNI</Text>
        <TextInput
          style={styles.input}
          placeholder="12345678"
          placeholderTextColor="#C1C1C1"
          value={userData.dni}
          onChangeText={(text) => setUserData({ ...userData, dni: text })}
          keyboardType="numeric"
        />
        <Text style={styles.label}>Nombres</Text>
        <TextInput
          style={styles.input}
          placeholder="Ejm: Juan Carlos"
          placeholderTextColor="#C1C1C1"
          value={userData.nombres}
          onChangeText={(text) => setUserData({ ...userData, nombres: text })}
        />
        <Text style={styles.label}>Apellidos</Text>
        <TextInput
          style={styles.input}
          placeholder="Ejm: Martínez"
          placeholderTextColor="#C1C1C1"
          value={userData.apellidos}
          onChangeText={(text) => setUserData({ ...userData, apellidos: text })}
        />
        <Text style={styles.label}>Celular</Text>
        <TextInput
          style={styles.input}
          placeholder="Ejm: 987654321"
          placeholderTextColor="#C1C1C1"
          value={userData.celular}
          onChangeText={(text) => setUserData({ ...userData, celular: text })}
          keyboardType="numeric"
        />
        <Text style={styles.label}>N° Tienda</Text>
        <TextInput
          style={styles.input}
          placeholder="N° 70"
          placeholderTextColor="#C1C1C1"
          value={userData.numeroTienda}
          onChangeText={(text) =>
            setUserData({ ...userData, numeroTienda: text })
          }
        />
        <Text style={styles.label}>Piso</Text>
        <TextInput
          style={styles.input}
          placeholder="2"
          placeholderTextColor="#C1C1C1"
          value={userData.piso}
          onChangeText={(text) => setUserData({ ...userData, piso: text })}
        />
        <Text style={styles.label}>Pasillo</Text>
        <TextInput
          style={styles.input}
          placeholder="2"
          placeholderTextColor="#C1C1C1"
          value={userData.pasillo}
          onChangeText={(text) => setUserData({ ...userData, pasillo: text })}
        />
        <TouchableOpacity style={styles.button} onPress={UpdateUser}>
          <Text style={styles.buttonText}>Actualizar</Text>
        </TouchableOpacity>
      </ScrollView>)}

      <View style={styles.optionsContainer}>
        <TouchableOpacity onPress={Home}>
          <HomeIcon style={styles.iconOptions} width={24} height={24} />
        </TouchableOpacity>
        <View style={styles.buttonListOptionsContainer}>
          <TouchableOpacity
            style={styles.buttonListOptions}
            onPress={RecordScreen}
          >
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
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 20,
    backgroundColor: "#FBFBFB",
  },
  container: {
    flex: 1, // Asegura que el contenedor ocupe todo el espacio disponible
    backgroundColor: "#FBFBFB",
    paddingHorizontal: 20,
  },
  containerFomr: {
    paddingBottom: 50,
    backgroundColor: "#fff",
    paddingHorizontal: 0,
    justifyContent: "center",
    backgroundColor: "#FBFBFB",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  input: {
    height: 58,
    borderColor: "#509BF8",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontWeight: "bold",
    color: "#000",
  },
  button: {
    backgroundColor: "#509BF8",
    borderRadius: 40,
    paddingVertical: 22,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
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
  }, containerlanding: {
    flex: 1,
    height: "100%",
    display: "flex",
    justifyContent:"center"
  },
});

export default UpdateScreen;
