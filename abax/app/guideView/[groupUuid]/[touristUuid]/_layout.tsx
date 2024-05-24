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
                <Stack.Screen name="index" options={{ title: 'Информация за турист', headerRight: () => <SignOutBtn />, headerLeft: () => <BackButton /> }} />
                
            </Stack>
        </GuideGroupsProvider>
    )
}
