import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Button, Text } from 'tamagui';

export const BackButton = () => {
  const router = useRouter();
  return (
    <Button
      unstyled
      flexDirection="row"
      backgroundColor="transparent"
      paddingLeft={0}
      pressStyle={{ opacity: 0.5 }}
      onPress={router.back}
      icon={<Feather name="chevron-left" size={20} color="#bf322c" />}></Button>
  );
};