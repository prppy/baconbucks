import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../config/colors';
import { HomeStack } from '../stacks/HomeStack';
import { RemindersStack } from '../stacks/RemindersStack';
import { SettingsStack } from '../stacks/SettingsStack';
import { MissionsStack } from "../stacks/MissionsStack";
import CommunityScreen from '../../screens/CommunityScreen';
import { StatisticsStack } from '../stacks/StatisticsStack';


const Tab = createBottomTabNavigator();

export const HomeTabs = () => {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({focused, color, size}) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Statistics') {
          iconName = focused ? 'pie-chart' : 'pie-chart-outline';
        } else if (route.name === 'Reminders') {
          iconName = focused ? 'notifications' : 'notifications-outline';
        } else if (route.name === 'Missions') {
          iconName = focused ? 'rocket' : 'rocket-outline'
        } else if (route.name === 'Community') {
          iconName = focused ? 'people' : 'people-outline';
        } else if (route.name === 'Settings') {
          iconName = focused ? 'settings' : 'settings-outline';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#DF4B75',
      tabBarInactiveTintColor: 'gray',
    })}      
    >
      <Tab.Screen name="Home" options={{ headerShown: false }} component={HomeStack} />
      <Tab.Screen name="Statistics" options={{ headerShown: false }} component={StatisticsStack} />
      <Tab.Screen name="Reminders" options={{ headerShown: false }} component={RemindersStack} />
      <Tab.Screen name="Missions" options={{ headerShown: false }} component={MissionsStack} />
      <Tab.Screen name="Community" options={{ headerShown: false }} component={CommunityScreen} />
      <Tab.Screen name="Settings" options={{ headerShown: false }} component={SettingsStack} />
    </Tab.Navigator>
  );
}