import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { Stack } from 'expo-router'
import { useColorScheme } from 'react-native'
import { TamaguiProvider } from 'tamagui'
import { SafeAreaProvider } from "react-native-safe-area-context";
import { tamaguiConfig } from '../tamagui.config'

export default function RootLayout({ children }: { children?: React.ReactNode }) {
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
            {children}
          </Stack>
        </ThemeProvider>
      </TamaguiProvider>
    </SafeAreaProvider>
  )
}
