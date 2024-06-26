import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import ChallengesScreen from "../../screens/ChallengesScreen";
import QuizScreen from "../../screens/QuizScreen";


const Stack = createStackNavigator();

export const ChallengesStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ChallengesScreen" component={ChallengesScreen} />
            <Stack.Screen name="Quiz" component={QuizScreen} />
        </Stack.Navigator>
    );
};