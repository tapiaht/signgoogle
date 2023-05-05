import { Text, Button, SafeAreaView } from 'react-native'
import React from 'react'

export default function WaterScreen(props) {
    const { navigation } = props;
    const goToPage=(pageName)=>{
        navigation.navigate(pageName)
    }
  return (
    <SafeAreaView>
      <Text>Agua</Text>
      <Text>Agua</Text>
      <Text>Agua</Text>
      <Text>Agua</Text>
      <Text>Agua</Text>
      <Text>Agua</Text>
      <Text>Agua</Text>
      <Text>Agua</Text>
      <Text>Agua</Text>
      <Text>Agua</Text>
      <Button onPress={()=>goToPage("Home")} title="Ir a Home"/>

    </SafeAreaView>
  )
}