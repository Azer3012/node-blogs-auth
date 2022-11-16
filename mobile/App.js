import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Stacks from './app/stacks/Stacks'
import { NavigationContainer } from '@react-navigation/native'

const App = () => {
  return (
    <NavigationContainer>
      <Stacks/>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})