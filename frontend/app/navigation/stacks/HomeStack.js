import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import SavingsScreen from "../../screens/SavingsScreen";
import SpendingsScreen from "../../screens/SpendingsScreen";
import HomeScreen from "../../screens/HomeScreen";


const Stack = createStackNavigator();

export const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeScreen" options={{ headerShown: false }} component={HomeScreen} />
            <Stack.Screen name="Savings" component={SavingsScreen} />
            <Stack.Screen name="Spendings" component={SpendingsScreen} />
        </Stack.Navigator>
    );
};