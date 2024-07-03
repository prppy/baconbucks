import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../../screens/HomeScreen";
import NewTransactionScreen from '../../screens/NewTransactionScreen';

const Stack = createStackNavigator();

export const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeScreen" options={{ headerShown: false }} component={HomeScreen} />
            <Stack.Screen name="Add New Transaction" component={NewTransactionScreen} />
        </Stack.Navigator>
    );
};