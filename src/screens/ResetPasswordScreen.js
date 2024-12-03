import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import CodeResetPassword from "../services/Password/CodeResetPassword";
import { Ionicons } from "@expo/vector-icons";

const ResetPasswordScreen = () => {
  const navigation = useNavigation();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(false);
  const route = useRoute();
  const { code } = route.params || {};

  // Validación de la contraseña con el nuevo orden
  const validatePassword = (password) => {
    // Primero, validamos las letras mayúsculas y minúsculas
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);

    // Luego validamos los caracteres especiales
    const specialChars = password.match(/[@./\-_*]/g) || [];
    const uniqueSpecialChars = new Set(specialChars); // Únicos caracteres especiales
    const hasTwoSpecialChars = uniqueSpecialChars.size >= 2;

    // Luego validamos los números
    const numbers = password.match(/\d/g) || [];
    const uniqueNumbers = new Set(numbers); // Únicos números
    const hasThreeNumbers = uniqueNumbers.size >= 3;

    // Finalmente, validamos la longitud mínima
    const minLength = password.length >= 10;

    return {
      hasUpperCase,
      hasLowerCase,
      hasTwoSpecialChars,
      hasThreeNumbers,
      minLength,
    };
  };

  // Actualizar el mensaje de validación de la contraseña
  useEffect(() => {
    const {
      hasUpperCase,
      hasLowerCase,
      hasTwoSpecialChars,
      hasThreeNumbers,
      minLength,
    } = validatePassword(password);

    // Primero se validan las letras mayúsculas y minúsculas
    if (!hasUpperCase || !hasLowerCase) {
      setPasswordValidation(
        "La contraseña debe incluir al menos una letra mayúscula y una letra minúscula."
      );
      setIsValidPassword(false);
    }
    // Luego los caracteres especiales
    else if (!hasTwoSpecialChars) {
      setPasswordValidation(
        "La contraseña debe incluir al menos 2 caracteres especiales diferentes (por ejemplo: @, ., /, -, *)."
      );
      setIsValidPassword(false);
    }
    // Después los números
    else if (!hasThreeNumbers) {
      setPasswordValidation(
        "La contraseña debe incluir al menos 3 números diferentes."
      );
      setIsValidPassword(false);
    }
    // Finalmente, la longitud
    else if (!minLength) {
      setPasswordValidation(
        "La contraseña debe tener un mínimo de 10 caracteres."
      );
      setIsValidPassword(false);
    } else {
      setPasswordValidation("La contraseña es válida.");
      setIsValidPassword(true);
    }
  }, [password]);

  const ResetPassword = async () => {
    if (!password) {
      Alert.alert("Aviso!", "La nueva Contraseña es requerida.", [
        { text: "OK" },
      ]);
      return;
    }
    if (!isValidPassword) {
      Alert.alert("Alerta", "La contraseña no cumple con los requisitos.", [
        { text: "OK" },
      ]);
      return;
    }
    try {
      const response = await CodeResetPassword(password, code);
      Alert.alert("Verificación", response.message, [
        { text: "OK", onPress: () => navigation.navigate("Login") },
      ]);
    } catch (error) {
      Alert.alert("Validación", error.message, [{ text: "OK" }]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.Recover}>Cambiar Contraseña</Text>
      <Text style={styles.label}>Nueva Contraseña</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputP}
          placeholder="*******"
          placeholderTextColor="#C1C1C1"
          secureTextEntry={!showPassword}
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
      <>
        {passwordValidation && (
          <Text
            style={[
              styles.validationText,
              isValidPassword ? { color: "green" } : { color: "red" },
            ]}
          >
            {passwordValidation}
          </Text>
        )}
      </>
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
  inputP: {
    flex: 1,
    fontWeight: "bold",
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
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 58,
    borderColor: "#509BF8",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontWeight: "bold",
    color: "#000",
    position: "relative",
  },
  validationText: {
    width: "100%",
    textAlign: "left",
    fontSize: 14,
    flexWrap: "wrap",
    marginBottom: 20,
  },
});

export default ResetPasswordScreen;
