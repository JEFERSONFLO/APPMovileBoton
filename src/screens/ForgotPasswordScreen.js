import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import EmailPassword from "../services/Password/EmailPassword";

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState("");

  const ResetPassword = async () => {
    if (!email) {
      Alert.alert("Alerta", "Todos los campos son obligatorios.", [
        { text: "OK" },
      ]);

      return;
    }
    setLoading(true);
    try {
      const response = await EmailPassword(email);
      console.log("verificar", response);
      Alert.alert("Existoso", response.message, [
        { text: "OK", onPress: () => navigation.navigate("CodePassword") },
      ]);
    } catch (error) {
      Alert.alert("Recuperar Contraseña", error.message, [{ text: "OK" }]);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Text style={styles.Recover}>Recuperar Contraseña</Text>
          <Text style={styles.label}>Correo</Text>
          <TextInput
            style={styles.input}
            placeholder="Correo@gmail.com"
            placeholderTextColor="#C1C1C1"
            value={email}
            onChangeText={setEmail}
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
        </>
      )}
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

export default ForgotPasswordScreen;
