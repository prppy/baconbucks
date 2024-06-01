import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { HomeStack, LogInStack } from './app/navigation/stack';

export default function App() {
  return (
    <NavigationContainer>
      <LogInStack />
    </NavigationContainer>
  );
}