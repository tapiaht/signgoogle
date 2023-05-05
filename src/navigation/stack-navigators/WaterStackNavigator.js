import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'

import { screens } from '../RouteItems'

const Stack = createStackNavigator()

const MyRewards = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Agua screen!</Text>
    <Text>Agua screen!</Text>
    <Text>Agua screen!</Text>
  

  </View>
)

const WaterStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name={screens.MyRewards} component={MyRewards} />
    </Stack.Navigator>
  )
}

export default WaterStackNavigator
