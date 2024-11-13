import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import CodeResetPassword from "../services/Password/CodeResetPassword";

const ResetPasswordScreen = () => {
  const navigation = useNavigation();
  const [Password, setPassword] = useState("");
  const route = useRoute();
  const { code } = route.params || {};
  const ResetPassword = async () => {
    if (!Password) {
      Alert.alert("Aviso!", "La nueva Contraseña es requerida.", [
        { text: "OK" },
      ]);
    }
    try {
      const response = await CodeResetPassword(Password, code);
      Alert.alert("Verificación", response.message, [{ text: "OK", onPress: () => navigation.navigate("Login") }]);
    } catch (error) {
      Alert.alert("Validación", error.message, [{ text: "OK" }]);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.Recover}>Cambiar Contraseña</Text>
      <Text style={styles.label}>Nueva Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="nueva contraseña"
        placeholderTextColor="#C1C1C1"
        value={Password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={ResetPassword}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonRecover}
        onPress={() => navigation.goBack()}
      >
        <View style={styles.buttonWhite}>
          <Text style={styles.buttonTextRecover}>Regresar</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    justifyContent: "center",
    width: "100vw",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    alignSelf: "flex-start",
  },
  Recover: {
    fontSize: 24,
    fontWeight: "800",
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
  buttonRecover: {
    backgroundColor: "#509BF8",
    borderRadius: 40,
    padding: 2,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonWhite: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 40,
    paddingVertical: 22,
    alignItems: "center",
  },
  buttonTextRecover: {
    color: "#509BF8",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ResetPasswordScreen;
