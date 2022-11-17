import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Stacks from './app/stacks/Stacks';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {store} from './app/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stacks />
      </NavigationContainer>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
