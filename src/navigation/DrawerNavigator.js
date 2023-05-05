import * as React from 'react'
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import Icon from 'react-native-vector-icons/FontAwesome'

import BottomTabNavigator from './BottomTabNavigator'
import { routes, screens } from './RouteItems'

const Drawer = createDrawerNavigator()

function CustomDrawerContent (props) {
  const currentRouteName = props.nav()?.getCurrentRoute()?.name
  return (
    <DrawerContentScrollView {...props}>
      {
        routes.filter(route => route.showInDrawer).map((route) => {
          const focusedRoute = routes.find(r => r.name === currentRouteName)
          const focused = focusedRoute ?
            route.name === focusedRoute?.focusedRoute :
            route.name === screens.HomeStack
          return (
            <DrawerItem
              key={route.name}
              label={() => (
                <Text style={focused ? styles.drawerLabelFocused : styles.drawerLabel}>
                  {route.title}
                </Text>
              )}

              icon={route.icon}
              onPress={() => props.navigation.navigate(route.name)}
              style={[styles.drawerItem, focused ? styles.drawerItemFocused : null]}
            />

          )
        })
      }
    </DrawerContentScrollView>
  )
}

export default function DrawerNavigator ({ nav }) {
  return (
    <Drawer.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: '#551E18',
          height: 50,
        },
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={styles.headerLeft}>
            <Icon name="bars" size={20} color="#fff" />
          </TouchableOpacity>
        ),
      })}
      drawerContent={(props) => <CustomDrawerContent {...props} nav={nav} />}
    >
      <Drawer.Screen name={screens.HomeTab} component={BottomTabNavigator} options={{
        title: 'Home',
        headerTitle: () => (
        // <Image source={require('../assets/hotel_logo.jpg')} />
        <Text style={styles.headerTitle}>8 REMEDIOS NATURALES</Text>
        ),
        headerRight: () => (
          <View style={styles.headerRight}>
            <Icon name="bell" size={20} color="#fff" />
          </View>
        ),
      }}/>
    </Drawer.Navigator>
  )
}

const styles = StyleSheet.create({
  headerLeft: {
    marginLeft: 15,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  headerRight: {
    marginRight: 15,
  },
  // drawer content
  drawerLabel: {
    fontSize: 14,
  },
  drawerLabelFocused: {
    fontSize: 14,
    color: '#551E18',
    fontWeight: '500',
  },
  drawerItem: {
    height: 50,
    justifyContent: 'center'
  },
  drawerItemFocused: {
    backgroundColor: '#ba9490',
  },
})

