import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Login from '../../../scenes/login'
import Signup from '../../../scenes/signup'
import { colors } from '../../../theme';

const Stack = createStackNavigator()

export const LoginNavigator = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen
        name="Login"
        component={Login}
        options={() => ({
          headerStyle: {
            backgroundColor: colors.green,
            shadowOpacity: 0
          },
          headerTintColor: colors.green
        })}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={() => ({
          headerStyle: {
            backgroundColor: colors.background,
            shadowOpacity: 0
          },
          headerTintColor: colors.background,
        })}
      />
    </Stack.Navigator>
  )
}