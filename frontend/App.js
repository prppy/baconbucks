import * as React from 'react';
<<<<<<< Updated upstream
import { createStackNavigator } from '@react-navigation/stack';
import { HomeStack, LogInStack, RemindersStack } from './app/navigation/stack';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();
const RootStack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator initialRouteName="LogInStack">
        <RootStack.Screen name="LogInStack" options={{ headerShown: false }} component={LogInStack} />
        <RootStack.Screen name="HomeStack" options={{ headerShown: false }} component={HomeStack} />
        <RootStack.Screen name="RemindersStack" options={{ headerShown: false }} component={RemindersStack} />
      </RootStack.Navigator>
=======
import { NavigationContainer } from '@react-navigation/native';
import { MainStack } from './app/navigation/loginstack';

export default function App() {
  return (
    <NavigationContainer>
      <MainStack />
>>>>>>> Stashed changes
    </NavigationContainer>
  );
}
