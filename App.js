import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HomeScreen from './src/screens/HomeScreen'
import DetailsScreen from './src/screens/DetailsScreen'
import PaymentScreen from './src/screens/PaymentScreen'
import TabNavigator from './src/navigators/TabNavigator'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';



const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Tab"
          component={TabNavigator}
          options={{ animation: "slide_from_bottom" }}
        />
        <Stack.Screen name="Details"
          component={DetailsScreen}
          options={{ animation: "slide_from_bottom" }}
        />
          <Stack.Screen name="Payment"
          component={PaymentScreen}
          options={{ animation: "slide_from_bottom" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})