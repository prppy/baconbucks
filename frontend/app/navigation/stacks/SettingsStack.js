import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import SettingsScreen from "../../screens/SettingsScreen";
import LogInScreen from "../../screens/LogInScreen";
import MyAccountScreen from "../../screens/MyAccountScreen";

const Stack = createStackNavigator();

export const SettingsStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="SettingsPage" options={{ headerShown: false }} component={SettingsScreen} />
            <Stack.Screen name="LogIn" options={{ headerShown: false }} component={LogInScreen} />
            <Stack.Screen name="My Account" options={{ headerShown: false }} component={MyAccountScreen} />
        </Stack.Navigator>
    );
};