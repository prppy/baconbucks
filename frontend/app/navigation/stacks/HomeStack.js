import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import NewTransactionScreen from '../../screens/NewTransactionScreen';
import NewWalletScreen from '../../screens/NewWalletScreen';
import FinanceTrackerScreen from '../../screens/FinanceTrackerScreen';

const Stack = createStackNavigator();

export const HomeStack = () => {
    return (
        <Stack.Navigator initialRouteName="FinanceTracker"  screenOptions={{ headerShown: false }}>
            <Stack.Screen name="FinanceTracker" options={{ headerShown: false }} component={FinanceTrackerScreen} />
            <Stack.Screen name="NewTransaction" component={NewTransactionScreen} />
            <Stack.Screen name="Add New Wallet" component={NewWalletScreen} />
        </Stack.Navigator>
    );
};