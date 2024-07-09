import { createStackNavigator } from "@react-navigation/stack";
import React from 'react';
import LogInScreen from "../../screens/LogInScreen";
import SignUpScreen from "../../screens/SignUpScreen";
import { HomeTabs } from "../tabs/HomeTabs";

const Stack = createStackNavigator();

export const LogInStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="LogIn" component={LogInScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
            <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}