import React, { useContext } from 'react';
import { GuideTouristsContext } from '@/context/GuideTouristsContext';
import { useLocalSearchParams } from 'expo-router';
import { Text, YStack, XStack, Anchor, View } from 'tamagui';
import { ActivityIndicator, Linking } from 'react-native';

const Index = () => {
  const touristsInfo = useContext(GuideTouristsContext);
  const { touristUuid } = useLocalSearchParams();

  const tourist = touristsInfo?.find(t => t.uuid === touristUuid);

  if (!tourist) {
    return (
      <View flex={1} justifyContent="center" alignItems="center" padding={16} backgroundColor="#f0f0f0">
        <ActivityIndicator size="large" color="#bf322c" />
      </View>
    );
  }

  const handlePressPhone = (phoneNumber:any) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handlePressEmail = (email:any) => {
    if (email) {
      Linking.openURL(`mailto:${email}`);
    }
  };

  return (
    <View flex={1} padding={16} backgroundColor="#f0f0f0">
      <YStack space="$4">
        <Text fontSize={24} fontWeight="bold" color="#333" marginBottom={16}>{tourist.participant_name}</Text>
        <YStack space="$3">
          <XStack alignItems="center" space="$2">
            <Text fontSize={18} color="#555">Телефон:</Text>
            <Anchor onPress={() => handlePressPhone(tourist.phone_number)} fontSize={18} color="#007aff">{tourist.phone_number}</Anchor>
          </XStack>
          {tourist.email ? (
            <XStack alignItems="center" space="$2">
              <Text fontSize={18} color="#555">Имейл:</Text>
              <Anchor onPress={() => handlePressEmail(tourist.email)} fontSize={18} color="#007aff">{tourist.email}</Anchor>
            </XStack>
          ) : null}
          <XStack alignItems="center" space="$2">
            <Text fontSize={18} color="#555">Номер на резервация:</Text>
            <Text fontSize={18} color="#000">{tourist.reservation_number}</Text>
          </XStack>
        </YStack>
      </YStack>
    </View>
  );
};

export default Index;
