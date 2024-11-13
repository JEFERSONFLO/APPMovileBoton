import { useNavigation } from "@react-navigation/native";
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import ValidateCode from "../services/Password/ValidateCode";

const CodePasswordScreen = () => {
  const navigation = useNavigation();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef({}); // Usamos un objeto en lugar de un array para las referencias.

  const handleChange = (text, index) => {
    if (text.length > 1) text = text.charAt(text.length - 1); // solo un dígito

    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Si el texto no está vacío y no es el último campo, pasa al siguiente input
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (index) => {
    // Si el campo está vacío, mover al anterior y borrar
    if (code[index] === "") {
      if (index > 0) {
        const newCode = [...code];
        newCode[index - 1] = "";
        setCode(newCode);
        inputRefs.current[index - 1]?.focus();
      }
    } else {
     
      const newCode = [...code];
      newCode[index] = "";
      setCode(newCode);
    }
  };


  const CodeValidation = async () => {
    if (code.includes("")) {
      Alert.alert("Alerta", "El código es requerido");
      return;
    }

    const codeString = code.join("");
    console.log(codeString);
    try {
      const response = await ValidateCode(codeString);
      Alert.alert("Verificación", response.message, [
        {
          text: "OK",
          onPress: () => navigation.navigate("ResetPassword", { code: codeString }),
        },
      ]);
    } catch (error) {
      Alert.alert("Error", error.message, [{ text: "OK" }]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>El código tiene una duración de 5 minutos</Text>
      <Text style={styles.Recover}>Código de recuperación</Text>
      <Text style={styles.label}>Ingrese el código de 6 dígitos</Text>
      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.codeInput}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            keyboardType="default"
            maxLength={1}
            ref={(ref) => (inputRefs.current[index] = ref)} // Usamos un objeto para las referencias
            returnKeyType={index < 5 ? "next" : "done"}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Backspace") {
                handleBackspace(index); // Manejar el retroceso
              }
            }}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={CodeValidation}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonRecover} onPress={() => navigation.goBack()}>
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
  },
  Recover: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 20,
    color: "#000",
  },
  timerText: {
    fontSize: 14,
    color: "#000",
    textAlign: "left",
    marginBottom: 10,
    fontWeight: "bold",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  codeInput: {
    width: 50,
    height: 58,
    borderColor: "#509BF8",
    borderWidth: 1,
    borderRadius: 10,
    textAlign: "center",
    fontSize: 18,
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

export default CodePasswordScreen;
