import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
<<<<<<< Updated upstream
import LogInScreen from "../screens/LogInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import SavingsScreen from "../screens/SavingsScreen";
import SpendingsScreen from "../screens/SpendingsScreen";
import { HomeTabs } from "./tabs";
import RemindersScreen from "../screens/RemindersScreen";
import NewReminderScreen from '../screens/NewReminderScreen';
=======
import HomeScreen from "../screens/HomeScreen";
import SavingsScreen from "../screens/SavingsScreen";
import SpendingsScreen from "../screens/SpendingsScreen";
import RemindersScreen from "../screens/RemindersScreen";
import NewReminderScreen from "../screens/NewReminderScreen";
import SettingsScreen from "../screens/SettingsScreen";
import AccessibilityScreen from "../screens/AccessibilityScreen";
import MyAccountScreen from "../screens/MyAccountScreen";
>>>>>>> Stashed changes

const Stack = createStackNavigator();

export const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomePage" options={{ headerShown: false }} component={HomeScreen} />
            <Stack.Screen name="Savings" component={SavingsScreen} />
            <Stack.Screen name="Spendings" component={SpendingsScreen} />
        </Stack.Navigator>
    );
};

export const RemindersStack = () => {
    return (
        <Stack.Navigator>
<<<<<<< Updated upstream
            <Stack.Screen name="LogIn" component={LogInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="HomeStack" options={{ headerShown: false }} component={HomeStack} />
=======
            <Stack.Screen name="RemindersPage" component={RemindersScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="New Reminder" component={NewReminderScreen} />
        </Stack.Navigator>
    )
}

export const SettingsStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="SettingsPage" options={{ headerShown: false }} component={SettingsScreen} />
            <Stack.Screen name="Accessibility" component={AccessibilityScreen} />
            <Stack.Screen name="My Account" component={MyAccountScreen} />
>>>>>>> Stashed changes
        </Stack.Navigator>
    );
};

export const RemindersStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Reminders" component={RemindersScreen} />
            <Stack.Screen name="New Reminder" component={NewReminderScreen} />
        </Stack.Navigator>
    );
};
