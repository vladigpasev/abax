import { BackButton } from "@/components/BackButton";
import { SignOutBtn } from "@/components/SignOutBtn";
import { GuideGroupsProvider } from "@/context/GuideGroupsContext";
import { Slot, Stack } from "expo-router";


export default function GuideViewLayout() {

    return (
        <GuideGroupsProvider>
            <Stack
                screenOptions={{
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerBackTitleVisible: false,
                }}>
                <Stack.Screen name="guideAllGroups" options={{ title: 'Моите групи', headerRight: () => <SignOutBtn /> }} />
                <Stack.Screen name="guideLogin" options={{ title: 'Вход като гид', headerLeft: () => <BackButton /> }} />
                <Stack.Screen name="[groupUuid]/(tabs)" options={{headerShown: false}} />
                <Stack.Screen name="[groupUuid]/[touristUuid]" options={{headerShown: false}} />
            </Stack>
        </GuideGroupsProvider>
    )
}
