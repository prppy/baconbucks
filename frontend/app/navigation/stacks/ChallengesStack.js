import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import ChallengesScreen from "../../screens/ChallengesScreen";
import QuizScreen from "../../screens/QuizScreen";
import ResultsScreen from '../../screens/ResultsScreen';


const Stack = createStackNavigator();

export const ChallengesStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ChallengesScreen" options={{ headerShown: false }} component={ChallengesScreen} />
            <Stack.Screen name="Quiz" component={QuizScreen} />
            <Stack.Screen name="Results" component={ResultsScreen} />
        </Stack.Navigator>
    );
};