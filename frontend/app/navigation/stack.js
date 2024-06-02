import { createStackNavigator } from "@react-navigation/stack";

import LogInScreen from "../screens/LogInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import SavingsScreen from "../screens/SavingsScreen";
import SpendingsScreen from "../screens/SpendingsScreen";
import { HomeTabs } from "./tabs";

const Stack = createStackNavigator();

export const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeTabs" component={HomeTabs} />
            <Stack.Screen name="Savings" component={SavingsScreen} />
            <Stack.Screen name="Spendings" component={SpendingsScreen} />
        </Stack.Navigator>
    )
}

export const LogInStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="LogIn" component={LogInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="HomeStack" component={HomeStack} />
        </Stack.Navigator>
    )
}