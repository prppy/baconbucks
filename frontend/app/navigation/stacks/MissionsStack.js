import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MissionsScreen from "../../screens/MissionsScreen";
import QuizScreen from "../../screens/QuizScreen";
import ResultsScreen from "../../screens/ResultsScreen";

const Stack = createStackNavigator();

export const MissionsStack = () => {
    return (
        <Stack.Navigator initialRouteName="MissionsScreen" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MissionsScreen" component={MissionsScreen} />
            <Stack.Screen name="QuizScreen" component={QuizScreen} />
            <Stack.Screen name="Results" component={ResultsScreen} />
        </Stack.Navigator>
    );
};
