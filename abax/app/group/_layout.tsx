import React from 'react';
import { Stack, Tabs } from 'expo-router';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { GroupProvider } from '@/context/GroupContext';
import { SignOutBtn } from '@/components/SignOutBtn';

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <GroupProvider>
            <Stack.Screen options={{ title: 'Информация за група', headerRight: () => <SignOutBtn /> }} />
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                    headerShown: false,
                }}>
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Home',
                        tabBarIcon: ({ color, focused }) => (
                            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="settings"
                    options={{
                        title: 'Настройки',
                        tabBarIcon: ({ color, focused }) => (
                            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
                        ),
                    }}
                />
            </Tabs>
        </GroupProvider>
    );
}
