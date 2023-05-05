import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'

import { screens } from '../RouteItems'

const Stack = createStackNavigator()

const Locations = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Descanzo screen!</Text>
  </View>
)

const BreakStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name={screens.Locations} component={Locations} />
    </Stack.Navigator>
  )
}

export default BreakStackNavigator
