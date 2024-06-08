import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeStack, RemindersStack, SettingsStack } from './stack';
import ChallengesScreen from '../screens/ChallengesScreen';
import CommunityScreen from '../screens/CommunityScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../config/colors';


const Tab = createBottomTabNavigator();


export const HomeTabs = () => {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({focused, color, size}) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Reminders') {
          iconName = focused ? 'notifications' : 'notifications-outline';
        } else if (route.name === 'Challenges') {
          iconName = focused ? 'game-controller' : 'game-controller-outline'
        } else if (route.name === 'Community') {
          iconName = focused ? 'people' : 'people-outline';
        } else if (route.name === 'Settings') {
          iconName = focused ? 'settings' : 'settings-outline';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: colors.darkPink,
      tabBarInactiveTintColor: 'gray',
    })}      
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Reminders" component={RemindersStack} />
      <Tab.Screen name="Challenges" component={ChallengesScreen} />
      <Tab.Screen name="Community" component={CommunityScreen} />
      <Tab.Screen name="Settings" component={SettingsStack} />
    </Tab.Navigator>
  );
}