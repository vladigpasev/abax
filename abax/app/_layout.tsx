import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { Slot, Stack } from 'expo-router'
import { useColorScheme } from 'react-native'
import { TamaguiProvider } from 'tamagui'
import { SafeAreaProvider } from "react-native-safe-area-context";
import { tamaguiConfig } from '../tamagui.config'
import { BackButton } from '@/components/BackButton';
import { SignOutBtn } from '@/components/SignOutBtn';

export default function RootLayout() {
  const colorScheme = useColorScheme()

  return (
    <SafeAreaProvider>
      {/* @ts-ignore */}
      <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack
            screenOptions={{
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerBackTitleVisible: false,
            }}>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="group" options={{ title: 'Информация за група', headerRight: () => <SignOutBtn /> }} />
            <Stack.Screen name="join" options={{ title: 'Присъедини се', headerLeft: () => <BackButton /> }} />
            <Stack.Screen name="(guideView)" options={{ headerShown: false }} />
          </Stack>
        </ThemeProvider>
      </TamaguiProvider>
    </SafeAreaProvider>
  )
}
