import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Dashboard } from '../screens'
import helpers from '../helpers/helpers'

import MainTab from './Tabs'
import { ForgotPassword, Login, Registration, ResetPassword } from '../pages'

const Stack=createNativeStackNavigator()
const Stacks = () => {
  return (
    <Stack.Navigator screenOptions={helpers.screenOptions}>
        <Stack.Screen name='login' component={Login}/>
        <Stack.Screen name='MainTab' component={MainTab}/>
        <Stack.Screen name='registration' component={Registration}/>
        <Stack.Screen name='forgotPassword' component={ForgotPassword}/>
        <Stack.Screen name='resetPassword' component={ResetPassword}/>
    </Stack.Navigator>
  )
}

export default Stacks

const styles = StyleSheet.create({})