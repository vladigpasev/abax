import React from 'react'
import { Stack } from 'expo-router'
import { Text, View } from 'tamagui'
import { Slot } from 'expo-router';


const GuideLayout = () => {
    return (
        <View>
            <Stack.Screen options={{ title: 'Опции за гидове' }} />
            <Slot />
        </View>
    )
}

export default GuideLayout