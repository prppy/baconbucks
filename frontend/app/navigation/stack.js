import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import LogInScreen from "../screens/LogInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import SavingsScreen from "../screens/SavingsScreen";
import SpendingsScreen from "../screens/SpendingsScreen";
import { HomeTabs } from "./tabs";
import RemindersScreen from "../screens/RemindersScreen";
import NewReminderScreen from '../screens/NewReminderScreen';

const Stack = createStackNavigator();

export const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeTabs" options={{ headerShown: false }} component={HomeTabs} />
            <Stack.Screen name="Savings" component={SavingsScreen} />
            <Stack.Screen name="Spendings" component={SpendingsScreen} />
        </Stack.Navigator>
    );
};

export const LogInStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="LogIn" component={LogInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="HomeStack" options={{ headerShown: false }} component={HomeStack} />
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
