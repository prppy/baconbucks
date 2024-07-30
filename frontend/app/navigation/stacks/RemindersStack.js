import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import RemindersScreen from "../../screens/RemindersScreen";


const Stack = createStackNavigator();

export const RemindersStack = () => {
    return (
        <Stack.Navigator initialRouteName="RemindersScreen"  screenOptions={{ headerShown: false }}>
            <Stack.Screen name="RemindersScreen" component={RemindersScreen} />
        </Stack.Navigator>
    );
};