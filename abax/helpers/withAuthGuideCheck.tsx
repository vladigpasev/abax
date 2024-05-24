import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';

export function withAuthGuideCheck(Component: any) {
  return function AuthCheckWrapper(props: any) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const checkToken = async () => {
        try {
          const token = await AsyncStorage.getItem('accessToken');
          const guide = await AsyncStorage.getItem('guide');

          console.log('Token:', token);
          console.log('Guide:', guide);

          if (token) {
            if (guide) {
              router.replace('/guideView/guideAllGroups');
            } else {
              router.replace('/group');
            }
          } else {
            router.replace('/guideView/guideLogin');
          }
        } catch (error) {
          console.error('Error checking token:', error);
          setLoading(false);  // Ensure loading is set to false in case of error
        }
      };

      checkToken();
    }, []);

    if (loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#bf322c" />
        </View>
      );
    }

    return <Component {...props} />;
  };
}