import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import NewTransactionScreen from '../../screens/NewTransactionScreen';
import FinanceTrackerScreen from '../../screens/FinanceTrackerScreen';
import ViewWalletScreen from '../../screens/ViewWalletScreen';
import ViewTransactionScreen from '../../screens/ViewTransactionScreen';

const Stack = createStackNavigator();

export const HomeStack = () => {
    return (
        <Stack.Navigator initialRouteName="FinanceTracker"  screenOptions={{ headerShown: false }}>
            <Stack.Screen name="FinanceTracker" component={FinanceTrackerScreen} />
            <Stack.Screen name="NewTransaction" component={NewTransactionScreen} />
            <Stack.Screen name="ViewWallet" component={ViewWalletScreen} />
            <Stack.Screen name="ViewTransaction" component={ViewTransactionScreen} />
        </Stack.Navigator>
    );
};