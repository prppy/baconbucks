import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';

import { HomeStack } from './app/navigation/stacks/HomeStack';
import { LogInStack } from './app/navigation/stacks/LogInStack';
import { RemindersStack } from './app/navigation/stacks/RemindersStack';
<<<<<<< Updated upstream
import { SettingsStack } from './app/navigation/stacks/SettingsStack';
import { ChallengesStack } from './app/navigation/stacks/ChallengesStack';
import { Provider } from './app/components/GlobalContext';
=======
import { Provider } from './app/components/GlobalContext';  // Adjust the path as necessary
>>>>>>> Stashed changes

export const navigationRef = createNavigationContainerRef();
const RootStack = createStackNavigator();

export default function App() {
  return (
    <Provider>
      <NavigationContainer ref={navigationRef}>
        <RootStack.Navigator initialRouteName="LogInStack">
          <RootStack.Screen name="LogInStack" options={{ headerShown: false }} component={LogInStack} />
          <RootStack.Screen name="HomeStack" options={{ headerShown: false }} component={HomeStack} />
          <RootStack.Screen name="RemindersStack" options={{ headerShown: false }} component={RemindersStack} />
<<<<<<< Updated upstream
          <RootStack.Screen name="ChallengesStack" options={{ headerShown: false }} component={ChallengesStack} />
          <RootStack.Screen name="SettingsStack" options={{ headerShown: false }} component={SettingsStack} />
=======
>>>>>>> Stashed changes
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
