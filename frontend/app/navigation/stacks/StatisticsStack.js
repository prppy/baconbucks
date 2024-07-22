import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import SpendingsScreen from "../../screens/SpendingsScreen";
import StatisticsScreen from '../../screens/StatisticsScreen';
import EarningsScreen from '../../screens/EarningsScreen';


const Stack = createStackNavigator();

export const StatisticsStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="StatisticsScreen" options={{ headerShown: false }} component={StatisticsScreen} />
            <Stack.Screen name="Earnings" component={EarningsScreen} />
            <Stack.Screen name="Spendings" component={SpendingsScreen} />
        </Stack.Navigator>
    );
};