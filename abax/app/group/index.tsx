import { View, Text } from 'tamagui'
import React, { useContext, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GroupContext } from '@/context/GroupContext';
import { ActivityIndicator } from 'react-native';

const Index = () => {
    const groupInfo = useContext(GroupContext);
    return (
        <View>
            <View>{groupInfo ? <Text>{JSON.stringify(groupInfo)}</Text> : <ActivityIndicator size="large" color="#bf322c" />}</View>
        </View>
    )
}

export default Index