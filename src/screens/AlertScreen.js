import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SoundPlayer from 'react-native-sound-player';

const AlertScreen = () => {
  useEffect(() => {
    const playAlertSound = async () => {
      try {
        const audioUrl = 'https://resource.nextboostperu.com/audio/alerta.mp3'; // URL pública del archivo de audio
        SoundPlayer.playUrl(audioUrl);
      } catch (error) {
        console.error('No se pudo reproducir el sonido:', error);
      }
    };

    playAlertSound();

    return () => SoundPlayer.stop();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.alertText}>¡Alerta de robo!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  alertText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#d32f2f',
  },
});

export default AlertScreen;
