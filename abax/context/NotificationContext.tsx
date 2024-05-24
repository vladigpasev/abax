// NotificationContext.js

import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Определяне на типа за контекста
type NotificationContextType = {
  expoPushToken: string;
  requestPermissions: () => Promise<void>;
  permissionsGranted: boolean;
};

// Създаване на контекста с правилния тип
const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Хендлер за грешки при регистрация
async function handleRegistrationError(errorMessage: any) {
  alert('Моля разрешете известията за това приложение, за да можем да ви уведомяваме за важна информация, свързана с Вашето пътуване!');
}

// Функция за регистрация за push известия
async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      handleRegistrationError('Permission not granted to get push token for push notification!');
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError('Project ID not found');
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(pushTokenString);
      return pushTokenString;
    } catch (e) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError('Must use physical device for push notifications');
  }
}

// Функция за изпращане на токена към сървъра
const sendTokenToServer = async (expoPushToken: string) => {
  try {
    const response = await fetch('https://6f01-149-62-209-222.ngrok-free.app/api/save_notification_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: expoPushToken }),
    });

    if (!response.ok) {
      throw new Error('Failed to send token to server');
    }
    await AsyncStorage.setItem('isTokenSent', 'true');
    console.log('Token sent to server successfully');
  } catch (error) {
    console.error('Error sending token to server:', error);
  }
};

// Провайдър на контекста
export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [expoPushToken, setExpoPushToken] = useState<string>('');
  const [permissionsGranted, setPermissionsGranted] = useState<boolean>(false);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  const requestPermissions = async () => {
    try {
      const token = await registerForPushNotificationsAsync();
      if (token) {
        setExpoPushToken(token);
        setPermissionsGranted(true);

        const isTokenSent = await AsyncStorage.getItem('isTokenSent');
        if (!isTokenSent) {
          await sendTokenToServer(token);
        }
      } else {
        setPermissionsGranted(false);
      }
    } catch (error) {
      setPermissionsGranted(false);
    }
  };

  useEffect(() => {
    requestPermissions(); // Искане на разрешение за нотификации

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  return (
    <NotificationContext.Provider value={{ expoPushToken, requestPermissions, permissionsGranted }}>
      {children}
    </NotificationContext.Provider>
  );
};

// Хук за достъп до контекста
export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
