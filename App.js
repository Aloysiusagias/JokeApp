import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import {joke, main, menu} from './route';

const App = () => {
  const stack = createStackNavigator();
  return (
    <NavigationContainer >
      <stack.Navigator screenOptions={{headerShown: false}} >
        <stack.Screen name="menu" component={menu} />
        <stack.Screen name="main" component={main} />
        <stack.Screen name="joke" component={joke} />
      </stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
