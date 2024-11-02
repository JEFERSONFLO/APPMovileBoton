import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { fetchregister } from "../services/auth/register";
import login from "../services/auth/login";
import { useAuth } from "../context/AuthContext/AuthContext";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const { token, setToken } = useAuth();
  const [nombres, setNombres] = useState("");
  const [dni, setDni] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [password, setPassword] = useState("");
  const [celular, setCelular] = useState("");
  const [pasillo, setPasillo] = useState("");
  const [piso, setPiso] = useState("");
  const [email, setEmail] = useState("");
  const [usuario, setUsuario] = useState("");
  const [loading, setLoading] = useState(false);
  const [numeroTienda, setNumeroTienda] = useState("");
  const Login = () => {
    navigation.navigate("Login");
  };

  const handleDniChange = (value) => {
    const formattedDni = value.replace(/[^0-9]/g, "");
    setDni(formattedDni);
  };

  const handleCelularChange = (value) => {
    const formattedCelular = value.replace(/[^0-9]/g, "");
    setCelular(formattedCelular);
  };

  const fetchLogin = async () => {
    try {
      const dataLogin = { usuario, password };
      const response = await login({ dataLogin });
      setToken(response.access_token);
      Alert.alert("Login exitoso", "Bienvenido!");
    } catch (error) {
      Alert.alert("Alerta Login", error.message);
    }
  };

  const dataRegister = async () => {
    if (
      !dni ||
      dni.length !== 8 ||
      !nombres ||
      !apellidos ||
      !password ||
      !celular ||
      !pasillo ||
      !piso ||
      !email ||
      !usuario ||
      !numeroTienda
    ) {
      Alert.alert("Alerta", "Todos los campos son obligatorios.", [
        { text: "OK" },
      ]);
      return;
    }

    setLoading(true);

    try {
      await fetchregister(
        nombres,
        dni,
        apellidos,
        password,
        celular,
        pasillo,
        piso,
        email,
        usuario,
        numeroTienda
      );

     
      await fetchLogin();

     
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    } catch (error) {
      Alert.alert("Alerta Registro", error.message, [{ text: "OK" }]);
    } finally {
      setLoading(false);
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <View style={styles.container}>
            <Image source={require("../assets/alerta.png")} style={styles.logo} />
            <Text style={styles.title}>Regístrate</Text>
            <Text style={styles.label}>DNI</Text>
            <TextInput
              style={styles.input}
              placeholder="12345678"
              placeholderTextColor="#C1C1C1"
              value={dni}
              maxLength={8}
              onChangeText={handleDniChange}
            />
            <Text style={styles.label}>Usuario</Text>
            <TextInput
              style={styles.input}
              placeholder="user953"
              placeholderTextColor="#C1C1C1"
              value={usuario}
              onChangeText={setUsuario}
            />
            <Text style={styles.label}>Nombres</Text>
            <TextInput
              style={styles.input}
              placeholder="Ejm: Juan Carlos"
              placeholderTextColor="#C1C1C1"
              value={nombres}
              onChangeText={setNombres}
            />
            <Text style={styles.label}>Apellidos</Text>
            <TextInput
              style={styles.input}
              placeholder="Ejm: Martínez"
              placeholderTextColor="#C1C1C1"
              value={apellidos}
              onChangeText={setApellidos}
            />
            <Text style={styles.label}>Correo</Text>
            <TextInput
              style={styles.input}
              placeholder="Correo@gmail.com"
              placeholderTextColor="#C1C1C1"
              value={email}
              onChangeText={setEmail}
            />
            <Text style={styles.label}>Contraseña</Text>
            <TextInput
              style={styles.input}
              placeholder="*******"
              placeholderTextColor="#C1C1C1"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <Text style={styles.label}>Celular</Text>
            <TextInput
              style={styles.input}
              placeholder="Ejm: 987654321"
              placeholderTextColor="#C1C1C1"
              value={celular}
              onChangeText={handleCelularChange}
              maxLength={9}
            />
            <Text style={styles.label}>N° de tienda</Text>
            <TextInput
              style={styles.input}
              placeholder=" N°2"
              placeholderTextColor="#C1C1C1"
              value={numeroTienda}
              onChangeText={setNumeroTienda}
            />
            <Text style={styles.label}>Piso</Text>
            <TextInput
              style={styles.input}
              placeholder="2"
              placeholderTextColor="#C1C1C1"
              value={piso}
              onChangeText={setPiso}
            />

            <Text style={styles.label}>Pasillo</Text>
            <TextInput
              style={styles.input}
              placeholder="N° 70"
              placeholderTextColor="#C1C1C1"
              value={pasillo}
              onChangeText={setPasillo}
            />
            <TouchableOpacity style={styles.button} onPress={dataRegister}>
              <Text style={styles.buttonText}>Siguiente</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.registerContainer} onPress={Login}>
              <Text style={styles.registerText}>¿Ya tienes una cuenta?</Text>
              <Text style={styles.registerLink}>Ingresa aquí.</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 20,
  },
  container: {
    height: "100%",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
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
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  registerText: {
    fontWeight: "bold",
    color: "#7C7C7C",
    fontSize: 14,
  },
  registerLink: {
    color: "#509BF8",
    fontWeight: "bold",
    fontSize: 14,
    marginLeft: 5,
  },
});

export default RegisterScreen;
