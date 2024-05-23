import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Button, Text } from 'tamagui';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SignOutBtn = () => {
  const router = useRouter();
  const logout = async () => {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('guide');
    router.replace('/');
  }
  return (
    <Button
      unstyled
      flexDirection="row"
      backgroundColor="transparent"
      paddingLeft={0}
      pressStyle={{ opacity: 0.5 }}
      onPress={logout}
      icon={<Feather name="log-out" size={20} color="#bf322c" />}></Button>
  );
};