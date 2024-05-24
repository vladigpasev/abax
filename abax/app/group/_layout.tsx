import React, { useContext } from 'react';
import { Stack, Tabs } from 'expo-router';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { GroupContext, GroupProvider } from '@/context/GroupContext';
import { SignOutBtn } from '@/components/SignOutBtn';
import { PostsProvider } from '@/context/PostsContext';

export default function TabLayout() {
    const colorScheme = useColorScheme();
    return (
        <GroupProvider>
            <PostsProvider>
                <Tabs
                    screenOptions={{
                        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                        headerShown: true
                    }}>
                    <Tabs.Screen
                        name="index"
                        options={{
                            title: 'Известия',
                            tabBarIcon: ({ color, focused }) => (
                                <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
                            ),
                            headerShown: false,
                        }}
                    />
                    <Tabs.Screen
                        name="settings"
                        options={{
                            title: 'Настройки',
                            tabBarIcon: ({ color, focused }) => (
                                <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
                            ),
                            headerShown: false,
                        }}
                    />
                </Tabs>
            </PostsProvider>
        </GroupProvider>
    );
}
