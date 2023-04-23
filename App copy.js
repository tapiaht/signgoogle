import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import * as WebBroser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Button } from 'react-native-web';

WebBroser.maybeCompleteAuthSession();

export default function App() {
  const [accessToken, setAccessToken]=React.useState(null);
  const [user,setUser]=React.useState(null);
  const [request,response,promptAsync]= Google.useIdTokenAuthRequest({
  webClientId:"554981802634-374eh662oofq2i6sraq6rjc8kjndr5c3.apps.googleusercontent.com",
  // clientId:"554981802634-374eh662oofq2i6sraq6rjc8kjndr5c3.apps.googleusercontent.com",
  // androidClientId: "554981802634-d6oce6ff2inrmud50qfluob21bjotirp.apps.googleusercontent.com",
  androidClientId: "554981802634-d6oce6ff2inrmud50qfluob21bjotirp.apps.googleusercontent.com"

  // expoClientId: "554981802634-d6oce6ff2inrmud50qfluob21bjotirp.apps.googleusercontent.com"    
  });
  React.useEffect(()=>{
    if (response?.type==="success") {
      setAccessToken(response.authentication.accessToken);
      accessToken && fetchUserInfo();
    }
    
  },[response, accessToken])
  async function fetchUserInfo(){
      let response=await fetch("https://www.googleapis.com/userinfo/v2/me", {
          headers:{Authorization:`Bearer ${accessToken}`},
        });
      const userInfo=await response.json();
      setUser(userInfo);
    }
  const ShowUserInfo=()=>{
    if (user) {
    return (
    <View style={styles.container}>
      {/* <Text>{JSON.stringify(userInfo)}</Text> */}
      <Image source={{uri:user.picture}} style={{width:100,height:100, borderRadius:50}}/>
      {/* <Button title="Sign in with Google" onPress={()=>promptAsync()} />       */}
      {/* <Button title="delete local storage" onPress={()=>AsyncStorage.removeItem("@user")} /> */}
      <Text style={{fontSize:20, fontWeight:'bold'}} >{user.name}</Text>
      {/* <StatusBar style="auto" /> */}
    </View>
    );     
    }
  }
  return (
    <View style={styles.container}>
      {user && <ShowUserInfo/>}
      {user === null && 
        <>
        <Text style={{fontSize:35, fontWeight:'bold'}}>Welcome</Text>
        <Text style={{fontSize:25, fontWeight:'bold',marginBottom:20, color:'gray'}}>Please Login</Text>
        <TouchableOpacity 
          disabled={!request}
          onPress={()=>{
            promptAsync();
          }}
        >
          <Image source={require("./logo.jpg")} style={{width:300,height:40}}/>
        </TouchableOpacity>
        </>
      }
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
