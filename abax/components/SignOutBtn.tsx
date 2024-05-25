import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Button } from 'tamagui';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SignOutBtn = () => {
  const router = useRouter();

  const logout = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const guide = await AsyncStorage.getItem('guide');

    if (accessToken && guide !== 'true') {
      await fetch('https://6f01-149-62-209-222.ngrok-free.app/api/signoutfromgroup', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
    }

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
      icon={<Feather name="log-out" size={20} color="#bf322c" />}
    ></Button>
  );
};
