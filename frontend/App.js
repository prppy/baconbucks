import React, { useContext, } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';

import { HomeStack } from './app/navigation/stacks/HomeStack';
import { LogInStack } from './app/navigation/stacks/LogInStack';
import { RemindersStack } from './app/navigation/stacks/RemindersStack';
import { SettingsStack } from './app/navigation/stacks/SettingsStack';
import { ChallengesStack } from './app/navigation/stacks/ChallengesStack';
import { Context, Provider } from './app/components/GlobalContext';
import { HomeTabs } from './app/navigation/tabs/HomeTabs';

export const navigationRef = createNavigationContainerRef();
const RootStack = createStackNavigator();


const MainApp = () => {

    const globalContext = useContext(Context);
    const { isLoggedIn, userObj } = globalContext;

    return (
        <NavigationContainer ref={navigationRef}>
            <RootStack.Navigator initialRouteName="LogInStack">
                {(!isLoggedIn || !userObj) ? (
                        <RootStack.Screen name="LogInStack" options={{ headerShown: false }} component={LogInStack} />
                    ) : (
                        <RootStack.Screen name="HomeTabs" options={{ headerShown: false }} component={HomeTabs} />
                    )}
            </RootStack.Navigator>
        </NavigationContainer>
    );
};


export default function App() {
    return (
        <Provider>
            <MainApp/>
        </Provider>
    );
}
