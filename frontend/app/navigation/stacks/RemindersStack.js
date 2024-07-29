import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import RemindersScreen from "../../screens/RemindersScreen";
import NewReminderScreen from '../../screens/NewReminderScreen';


const Stack = createStackNavigator();

export const RemindersStack = () => {
    return (
        <Stack.Navigator initialRouteName="Reminders"  screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Reminders" component={RemindersScreen} />
            <Stack.Screen name="NewReminder" component={NewReminderScreen} />
        </Stack.Navigator>
    );
};