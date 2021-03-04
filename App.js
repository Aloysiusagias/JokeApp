import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import {joke, jokesMenu, menu, numbermain, quotes} from './route';

const App = () => {
  const stack = createStackNavigator();
  return (
    <NavigationContainer >
      <stack.Navigator screenOptions={{headerShown: false}} >
        <stack.Screen name="menu" component={menu} />
        <stack.Screen name="jokesMenu" component={jokesMenu} />
        <stack.Screen name="joke" component={joke} />
        <stack.Screen name="numbermain" component={numbermain}/>
        <stack.Screen name="quotes" component={quotes}/>
      </stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
