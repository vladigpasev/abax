// Index.js

import React, { useEffect, useRef } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View, Text, Button } from 'tamagui';
import JoinSvg from '@/components/JoinSvg';
import { Link, Stack } from 'expo-router';
import { withAuthCheck } from '@/helpers/withAuthCheck';
import { OfferCard } from '@/components/OfferCard';
import { useNotification } from '@/context/NotificationContext'; // Импорт на хука за нотификации
import * as Notifications from 'expo-notifications';

function Index() {
  const offers = [
    {
      title: 'Почивка в Анталия за двама',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      imageUri: 'https://www.abax.bg/img/SNIMKI/70a8c788d0c9463a4ceee85e4a74a9b6_157302824319.jpg'
    },
    {
      title: 'Почивка в Анталия за двама',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      imageUri: 'https://www.abax.bg/img/SNIMKI/70a8c788d0c9463a4ceee85e4a74a9b6_157302824319.jpg'
    },
    // Add more offers here
  ];

  const { requestPermissions, permissionsGranted } = useNotification(); // Вземане на функцията за искане на разрешения и състоянието на разрешенията от контекста

  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    requestPermissions(); // Искане на разрешение за нотификации

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current,
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <SafeAreaProvider>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          height="100%"
          backgroundColor="$background"
        >
          <View padding={10} paddingHorizontal={20} display="flex" flexDirection="column" gap={15}>
            {offers.map((offer, index) => (
              <OfferCard
                key={index}
                title={offer.title}
                description={offer.description}
                imageUri={offer.imageUri}
              />
            ))}
          </View>
        </ScrollView>
        <Link href="/join" asChild>
          <View
            position="absolute"
            bottom={50}
            right={20}
            borderRadius={30}
            justifyContent="center"
            alignItems="center"
            backgroundColor='transparent'
          >
            <View
              width={60}
              height={60}
              backgroundColor='#bf322c'
              borderRadius={30}
              justifyContent="center"
              alignItems="center"
              shadowColor='#000'
              shadowOffset={{ width: 0, height: 2 }}
              shadowOpacity={0.3}
              shadowRadius={2}
            >
              <JoinSvg />
            </View>
          </View>
        </Link>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default withAuthCheck(Index);
