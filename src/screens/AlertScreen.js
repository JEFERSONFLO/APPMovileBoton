import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import SoundPlayer from "react-native-sound-player";
import AlertaIcon from "../assets/icons/alert.svg";
import Modal from "react-native-modal";
import { useAuth } from "../context/AuthContext/AuthContext";

const AlertScreen = () => {
  const { alertData } = useAuth();
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const playAlertSound = async () => {
      try {
        const audioUrl = "https://resource.nextboostperu.com/audio/alerta.mp3";
        SoundPlayer.playUrl(audioUrl);
      } catch (error) {
        console.error("No se pudo reproducir el sonido:", error);
      }
    };

    playAlertSound();

    // Configurar un retraso de 4 segundos para mostrar el modal
    const modalTimeout = setTimeout(() => {
      setModalVisible(true);
    }, 1000);

    return () => {
      SoundPlayer.stop();
      clearTimeout(modalTimeout); // Limpiar el tiempo al desmontar el componente
    };
  }, []);

  return (
    <>
      <StatusBar backgroundColor="red" />
      <View style={styles.backgroundContainer}>
        <AlertaIcon width={90} height={90} fill="white" />
        <Text style={styles.alertText}>¡Alerta de robo!</Text>
      </View>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)} // Para cerrar el modal al tocar fuera
        animationIn="slideInUp" // Animación de deslizamiento de abajo hacia arriba
        animationOut="slideOutDown"
        style={styles.modal}
      >
        {/* Componente de alerta renderizado dentro del modal */}
        <View style={styles.modalContent}>
          <AlertaIcon width={80} height={80} fill="red" />
          <Text style={styles.alertTextModal}>¡Alerta de robo!</Text>

          {/* Información del usuario */}
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Usuario que emitió la alarma:</Text>
            <Text style={styles.infoText}>{alertData?.nombres}</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Ubicación</Text>
            <View style={styles.detailsContainer}>
            <Text style={styles.detailText}>Piso: {alertData?.piso}</Text>
              <Text style={styles.detailText}>Pasillo: {alertData?.pasillo}</Text>
              <Text style={styles.detailText}>Tienda: {alertData?.numeroTienda}</Text>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  alertText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginTop: 10,
  },
  alertTextModal: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginTop: 10,
  },
  infoContainer: {
    marginTop: 15,
    alignItems: "center",
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginBottom: 5,
  },
  infoText: {
    fontSize: 18,
    color: "black",
  },
  detailsContainer: {
    alignItems: "center",
    marginTop: 5,
  },
  detailText: {
    fontSize: 16,
    color: "black",
    marginVertical: 2,
  },
});

export default AlertScreen;
