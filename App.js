// import 'react-native-gesture-handler';
import { useEffect, useState,createRef } from "react";
import { StyleSheet, Text, View, Button, Image,SafeAreaView, StatusBar } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from '@react-navigation/native'
import  DrawerNavigator  from './src/navigation/DrawerNavigator'

WebBrowser.maybeCompleteAuthSession();
const navigationRef = createRef()
const nav = () => navigationRef.current
export default function App() {
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "554981802634-d6oce6ff2inrmud50qfluob21bjotirp.apps.googleusercontent.com",
    expoClientId: "554981802634-d6oce6ff2inrmud50qfluob21bjotirp.apps.googleusercontent.com",
    iosClientId: "",
    webClientId: "554981802634-374eh662oofq2i6sraq6rjc8kjndr5c3.apps.googleusercontent.com",
  });

  useEffect(() => {
    handleEffect();
  }, [response, token]);

  async function handleEffect() {
    const user = await getLocalUser();
    console.log("user", user);
    if (!user) {
      if (response?.type === "success") {
        // setToken(response.authentication.accessToken);
        getUserInfo(response.authentication.accessToken);
      }
    } else {
      setUserInfo(user);
      console.log("loaded locally");
    }
  }

  const getLocalUser = async () => {
    const data = await AsyncStorage.getItem("@user");
    if (!data) return null;
    return JSON.parse(data);
  };

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      // Add your own error handler here
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
    {/* <View style={styles.container}> */}
      {!userInfo ? (
        <Button
          title="Iniciar Session Google"
          disabled={!request}
          onPress={() => {
            promptAsync();
          }}
        />
        
      ) : (
        
        <View style={styles.safeArea}>
         
         
      
      <StatusBar barStyle="dark-content" />
      <NavigationContainer ref={navigationRef}>
          <DrawerNavigator nav={nav} />
          {userInfo?.picture && (
            <Image source={{ uri: userInfo?.picture }} style={styles.image} />
          )}
          <Text style={styles.text}>Email: {userInfo.email}</Text>
          <Text style={styles.text}>
            Verified: {userInfo.verified_email ? "yes" : "no"}
          </Text>
          <Text style={styles.text}>Name: {userInfo.name}</Text>
      </NavigationContainer>
      <Button
        title="Cerrar Sesion"
        onPress={async () =>{ await AsyncStorage.removeItem("@user")
        promptAsync()
      }}
      /> 
      </View>
        
      )}
      
      
    
    {/* </View> */}
     </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  safeArea: {
    flex: 1,
    overflow: 'hidden',
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  card: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 15,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

// "start": "expo start --dev-client",
// npx expo start --dev-client
// yarn cache clean
//eas build --platform android