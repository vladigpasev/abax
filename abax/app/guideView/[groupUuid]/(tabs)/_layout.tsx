import React, { useContext } from 'react';
import { Tabs } from 'expo-router';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useLocalSearchParams } from 'expo-router';
import { GuideGroupsContext } from '@/context/GuideGroupsContext';
import { Text } from 'tamagui';
import { BackButton } from '@/components/BackButton';
import { SignOutBtn } from '@/components/SignOutBtn';
import { GuideTouristsProvider } from '@/context/GuideTouristsContext';

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const params = useLocalSearchParams();
    const groupsInfo = useContext(GuideGroupsContext);

    const groupUuid = Array.isArray(params.groupUuid) ? params.groupUuid[0] : params.groupUuid;

    if (!groupUuid) {
        return <Text>Group UUID is missing</Text>;
    }

    const group = groupsInfo?.find(g => g.uuid === groupUuid);

    if (!group) {
        return <Text>Group not found</Text>;
    }

    return (
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                    headerShown: true,
                    headerTitle: group.groupName
                }}>
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Известия',
                        tabBarIcon: ({ color, focused }) => (
                            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
                        ),
                        headerLeft: () => <BackButton />,
                        headerRight: () => <SignOutBtn />,
                        headerShown: true,
                    }}
                />
                <Tabs.Screen
                    name="participants"
                    options={{
                        title: 'Туристи',
                        tabBarIcon: ({ color, focused }) => (
                            <TabBarIcon name={focused ? 'people' : 'people-outline'} color={color} />

                        ),
                        headerLeft: () => <BackButton />,
                        headerRight: () => <SignOutBtn />,
                        headerShown: true,
                    }}
                />
            </Tabs>
    );
}
