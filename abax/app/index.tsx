// Index.js

import React, { useContext, useEffect, useRef } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View, Text, Button } from 'tamagui';
import JoinSvg from '@/components/JoinSvg';
import { Link, Stack } from 'expo-router';
import { withAuthCheck } from '@/helpers/withAuthCheck';
import { OfferCard } from '@/components/OfferCard';
import { useNotification } from '@/context/NotificationContext'; // Импорт на хука за нотификации
import * as Notifications from 'expo-notifications';
import { OffersContext } from '@/context/OffersContext';

function Index() {
  const offers = useContext(OffersContext);
  
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
            {offers?.map((offer, index) => (
              <OfferCard
                key={index}
                title={offer.title}
                description={offer.description}
                imageUri={offer.photo}
                link={offer.link}
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
