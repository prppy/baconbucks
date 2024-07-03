import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import SpendingsScreen from "../../screens/SpendingsScreen";
import InsightsScreen from '../../screens/InsightsScreen';
import EarningsScreen from '../../screens/EarningsScreen';


const Stack = createStackNavigator();

export const InsightsStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="InsightsScreen" options={{ headerShown: false }} component={InsightsScreen} />
            <Stack.Screen name="Earnings" component={EarningsScreen} />
            <Stack.Screen name="Spendings" component={SpendingsScreen} />
        </Stack.Navigator>
    );
};