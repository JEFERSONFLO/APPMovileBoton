import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import login from "../services/auth/login";
import { useAuth } from "../context/AuthContext/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
const LoginScreen = () => {
  const { token, setToken } = useAuth();
  const navigation = useNavigation();
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    if (token) {
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    }
  }, [token, navigation]);

  const fetchLogin = async () => {
    setLoading(true);
    try {
      const dataLogin = { usuario, password };
      const response = await login({ dataLogin });
      setToken(response.access_token);
    } catch (error) {
      Alert.alert("Alerta Login", error.message);
    } finally {
      setLoading(false);
    }
  };
  const Register = () => {
    navigation.navigate("Register");
  };

  const ForgotPass = () => {
    navigation.navigate("ForgotPass");
  };
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Image source={require("../assets/alerta.png")} style={styles.logo} />
          <Text style={styles.welcome}>Bienvenido</Text>
          <Text style={styles.label}>Usuario</Text>
          <TextInput
            style={styles.input}
            placeholder="12345678"
            placeholderTextColor="#C1C1C1"
            value={usuario}
            onChangeText={setUsuario}
          />
          <Text style={styles.label}>Contraseña</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.inputP}
              placeholder="*******"
              placeholderTextColor="#C1C1C1"
              secureTextEntry={!showPassword} // Alternar visibilidad de la contraseña
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color="#C1C1C1"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.forgotPassword} onPress={ForgotPass}>
            <Text style={styles.forgotPasswordText}>
              ¿Olvidaste tu contraseña?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={fetchLogin}>
            <Text style={styles.buttonText}>Ingresar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.registerContainer} onPress={Register}>
            <Text style={styles.registerText}>¿Aún no tienes una cuenta?</Text>
            <Text style={styles.registerLink}>Regístrate aquí.</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputP: {
    flex: 1,
    fontWeight: "bold",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 58,
    borderColor: "#509BF8",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontWeight: "bold",
    color: "#000",
  },
  container: {
    height: "100%",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    justifyContent: "center",
    width: "100%",
  },
  logo: {
    width: 100,
    height: 100,
    objectFit: "contain",
    marginBottom: 20,
    alignSelf: "flex-start",
  },
  welcome: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 20,
    color: "#000",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
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
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: "#7C7C7C",
    fontWeight: "600",
    fontSize: 14,
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
    fontWeight: "800",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  registerText: {
    fontWeight: "600",
    color: "#7C7C7C",
    fontSize: 14,
  },
  registerLink: {
    color: "#509BF8",
    fontWeight: "600",
    fontSize: 14,
    marginLeft: 5,
  },
});

export default LoginScreen;
