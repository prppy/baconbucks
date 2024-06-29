import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import SpendingsScreen from "../../screens/SpendingsScreen";
import HomeScreen from "../../screens/HomeScreen";
import EarningsScreen from '../../screens/EarningsScreen';


const Stack = createStackNavigator();

export const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeScreen" options={{ headerShown: false }} component={HomeScreen} />
            <Stack.Screen name="Earnings" component={EarningsScreen} />
            <Stack.Screen name="Spendings" component={SpendingsScreen} />
        </Stack.Navigator>
    );
};