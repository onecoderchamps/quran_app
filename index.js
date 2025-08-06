import 'react-native-gesture-handler'; // <-- Important: Add this at the top for some navigators
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './src/navigator/MainScreen';
import { name as appName } from './app.json';
import { AppRegistry } from 'react-native';


export default function App() {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}

AppRegistry.registerComponent(appName, () => App);
