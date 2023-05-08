import { TextInput, Button, Text } from 'react-native'
import React from 'react'
import { View } from 'react-native-web'

export default function LoginForm() {
  return (
    <View>
      <TextInput placeholder='Email'/>
      <TextInput placeholder='Password'/>
      <Button title='Iniciar' onPress={()=>console.log("Iniciado")}/>
      <Text>Componente LoginForm</Text>
      <Text>Estee</Text>
    </View>
  )
}