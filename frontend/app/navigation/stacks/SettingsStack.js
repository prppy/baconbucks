import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import SettingsScreen from "../../screens/SettingsScreen";
import AccessibilityScreen from "../../screens/AccessibilityScreen";
import MyAccountScreen from "../../screens/MyAccountScreen";

const Stack = createStackNavigator();

export const SettingsStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="SettingsPage" options={{ headerShown: false }} component={SettingsScreen} />
            <Stack.Screen name="Accessibility" component={AccessibilityScreen} />
            <Stack.Screen name="MyAccount" component={MyAccountScreen} />
        </Stack.Navigator>
    );
};