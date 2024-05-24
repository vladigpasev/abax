import { View, Text, ActivityIndicator } from 'react-native'
import React, { useContext } from 'react'
import { GuideTouristsContext } from '@/context/GuideTouristsContext';


const Index = () => {
  const touristsInfo = useContext(GuideTouristsContext);
  return (
    <View>
      <Text><View>{touristsInfo ? <Text>{JSON.stringify(touristsInfo)}</Text> : <ActivityIndicator size="large" color="#bf322c" />}</View></Text>
    </View>
  )
}

export default Index