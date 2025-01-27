import React, { useEffect, useRef } from "react";
import { NavigationContainer, LinkingOptions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider } from "./src/context/AuthContext/AuthContext";
import LoginScreen from "./src/screens/LoginScreen";
import BtnScreen from "./src/screens/BtnScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import { PermissionsAndroid } from "react-native";
import messaging from "@react-native-firebase/messaging";
import { Linking } from "react-native";
import TokenNofi from "./src/services/token/token";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Vibration, Platform } from "react-native";
import AlertScreen from "./src/screens/AlertScreen";
import ForgotPasswordScreen from "./src/screens/ForgotPasswordScreen";
import UpdateScreen from "./src/screens/UpdateScreen";
import CodePasswordScreen from "./src/screens/CodePasswordScreen";
import ResetPasswordScreen from "./src/screens/ResetPasswordScreen";
import RecordScreen from "./src/screens/RecordScreen";

const Stack = createNativeStackNavigator();

function buildDeepLinkFromNotificationData(data) {
  const navigationId = data?.navigationId;
  const NAVIGATION_IDS = ["Home", "settings"];
  if (!NAVIGATION_IDS.includes(navigationId)) {
    console.warn("Unverified navigationId", navigationId);
    return null;
  }
  if (navigationId === "Home") {
    return "myapp://Home";
  }
  if (navigationId === "settings") {
    return "myapp://settings";
  }
  const postId = data?.postId;
  if (typeof postId === "string") {
    return `myapp://post/${postId}`;
  }
  console.warn("Missing postId");
  return null;
}

const linking = {
  prefixes: ["myapp://"],
  config: {
    initialRouteName: "Login",
    screens: {
      Login: "login",
      Home: "home",
      Post: "post/:id",
      Settings: "settings",
      Register: "register",
      Alert: "alert",
    },
  },
  async getInitialURL() {
    const url = await Linking.getInitialURL();
    if (typeof url === "string") {
      return url;
    }

    const message = await messaging().getInitialNotification();
    const deeplinkURL = buildDeepLinkFromNotificationData(message?.data);
    if (typeof deeplinkURL === "string") {
      return deeplinkURL;
    }
  },
  subscribe(listener) {
    const onReceiveURL = ({ url }) => listener(url);

    const linkingSubscription = Linking.addEventListener("url", onReceiveURL);

    const unsubscribe = messaging().onNotificationOpenedApp((remoteMessage) => {
      const url = buildDeepLinkFromNotificationData(remoteMessage.data);
      if (typeof url === "string") {
        listener(url);
      }
    });

    return () => {
      linkingSubscription.remove();
      unsubscribe();
    };
  },
};

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={BtnScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Alert"
        component={AlertScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPass"
        component={ForgotPasswordScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CodePassword"
        component={CodePasswordScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPasswordScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UpdateScreen"
        component={UpdateScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RecordScreen"
        component={RecordScreen}
        options={{ headerShown: false }}
      />
      
    </Stack.Navigator>
  );
};

const App = () => {
  const navigationRef = useRef(null);
  useEffect(() => {
    const requestUserPermission = async () => {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log("Authorization status:", authStatus);
        const token = await messaging().getToken();
        const authToken = await AsyncStorage.getItem("authToken");
        console.log(authToken);
        const datatoken = { token: token };
        TokenNofi(authToken, datatoken);
        console.log("FCM token:", token);
      }
    };

    const subscribeToAlerts = async () => {
      await messaging().subscribeToTopic("alerts");
      console.log("Suscrito al tema: alerts");
    };

    requestUserPermission();
    subscribeToAlerts();
  }, []);
  useEffect(() => {
    // Listener para notificaciones en primer plano
    const unsubscribeOnMessage = messaging().onMessage(
      async (remoteMessage) => {
        console.log("Notificación recibida en primer plano:", remoteMessage);
        // Aquí puedes mostrar la notificación localmente o en una alerta personalizada
      }
    );

    // Listener para cuando la notificación abre la app desde segundo plano o cerrada
    const unsubscribeOnNotificationOpenedApp =
      messaging().onNotificationOpenedApp((remoteMessage) => {
        console.log("Notificación abrió la aplicación:", remoteMessage);
      });

    // Listener para recibir notificación en segundo plano
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Notificación recibida en segundo plano:", remoteMessage);
    });

    return () => {
      unsubscribeOnMessage();
      unsubscribeOnNotificationOpenedApp();
    };
  }, []);
  useEffect(() => {
    const unsubscribeOnMessage = messaging().onMessage(
      async (remoteMessage) => {
        console.log("Notificación recibida en primer plano:", remoteMessage);
        navigationRef.current?.navigate("Alert"); // Navegar a AlertScreen
        if (Platform.OS === "android") {
          Vibration.vibrate(500); // Vibra durante 500 ms
        } else {
          Vibration.vibrate([0, 500, 200, 500]); // Ejemplo de patrón de vibración
        }
      }
    );

    const unsubscribeOnNotificationOpenedApp =
      messaging().onNotificationOpenedApp((remoteMessage) => {
        console.log("Notificación abrió la aplicación:", remoteMessage);
        navigationRef.current?.navigate("Alert"); // Navegar a AlertScreen
        Vibration.cancel();
      });

    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Notificación recibida en segundo plano:", remoteMessage);
      try {
        await SoundPlayer.playSoundFile("custom_sound", "wav");
      } catch (e) {
        console.log(`No se pudo reproducir el sonido: ${e.message}`);
      }
    });

    return () => {
      unsubscribeOnMessage();
      unsubscribeOnNotificationOpenedApp();
    };
  }, []);
  return (
    <AuthProvider>
      <NavigationContainer linking={linking} ref={navigationRef}>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
