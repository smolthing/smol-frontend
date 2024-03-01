import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Login from '../../../scenes/login'
import Signup from '../../../scenes/signup'

const Stack = createStackNavigator()

export const LoginNavigator = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen
        name="Login"
        component={Login}
        options={({ navigation }) => ({
          headerBackground: () => null,
          headerTintColor: "#c7d9c9"
        })}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={({ navigation }) => ({
          headerBackground: () => null,
          headerTintColor: "#c7d9c9"
        })}
      />
    </Stack.Navigator>
  )
}